package com.studentdashboard.service.impl;

import com.studentdashboard.dto.request.AttendanceRequest;
import com.studentdashboard.dto.request.MarksRequest;
import com.studentdashboard.dto.request.SubjectRequest;
import com.studentdashboard.entity.*;
import com.studentdashboard.repository.*;
import com.studentdashboard.service.AcademicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AcademicServiceImpl implements AcademicService {

    private final SubjectRepository subjectRepository;
    private final StudentMarksRepository marksRepository;
    private final AttendanceRepository attendanceRepository;
    private final AnalyticsRepository analyticsRepository;
    private final StudentProfileRepository profileRepository;
    private final UserRepository userRepository;

    private StudentProfile getProfileByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return profileRepository.findByUserId(user.getId()).orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    @Override
    @Transactional
    public Subject addSubject(String username, SubjectRequest request) {
        StudentProfile profile = getProfileByUsername(username);
        
        Subject subject;
        if (request.getId() != null) {
            subject = subjectRepository.findById(request.getId())
                    .orElseThrow(() -> new RuntimeException("Subject not found"));
            if (!subject.getStudent().getId().equals(profile.getId())) {
                throw new RuntimeException("Unauthorized");
            }
            subject.setSubjectCode(request.getSubjectCode());
            subject.setSubjectName(request.getSubjectName());
            subject.setCustomSubject(request.getCustomSubject());
            subject.setCredits(request.getCredits());
            subject.setSemester(request.getSemester());
        } else {
            subject = Subject.builder()
                    .student(profile)
                    .subjectCode(request.getSubjectCode())
                    .subjectName(request.getSubjectName())
                    .customSubject(request.getCustomSubject())
                    .credits(request.getCredits())
                    .semester(request.getSemester())
                    .build();
        }
        
        return subjectRepository.save(subject);
    }

    @Override
    @Transactional
    public void deleteSubject(String username, Long subjectId) {
        StudentProfile profile = getProfileByUsername(username);
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        if (!subject.getStudent().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        marksRepository.findByStudentIdAndSubjectId(profile.getId(), subjectId)
                .ifPresent(marksRepository::delete);

        attendanceRepository.findByStudentIdAndSubjectId(profile.getId(), subjectId)
                .ifPresent(attendanceRepository::delete);

        subjectRepository.delete(subject);
        recalculateAnalytics(username);
    }

    @Override
    public List<Subject> getSubjects(String username) {
        StudentProfile profile = getProfileByUsername(username);
        return subjectRepository.findByStudentId(profile.getId());
    }

    @Override
    public List<Subject> getSubjectsBySemester(String username, String semester) {
        StudentProfile profile = getProfileByUsername(username);
        return subjectRepository.findByStudentIdAndSemester(profile.getId(), semester);
    }

    @Override
    @Transactional
    public StudentMarks addOrUpdateMarks(String username, MarksRequest request) {
        StudentProfile profile = getProfileByUsername(username);
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        if (!subject.getStudent().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        StudentMarks marks = marksRepository.findByStudentIdAndSubjectId(profile.getId(), subject.getId())
                .orElse(new StudentMarks());

        marks.setStudent(profile);
        marks.setSubject(subject);
        marks.setSemester(request.getSemester());
        marks.setInternalMarks(request.getInternalMarks());
        marks.setExternalMarks(request.getExternalMarks());

        double total = (request.getInternalMarks() != null ? request.getInternalMarks() : 0) +
                       (request.getExternalMarks() != null ? request.getExternalMarks() : 0);
        marks.setTotalMarks(total);

        // Grade calculation logic
        String grade;
        if (total >= 90) grade = "O";
        else if (total >= 80) grade = "A+";
        else if (total >= 70) grade = "A";
        else if (total >= 60) grade = "B";
        else if (total >= 50) grade = "C";
        else grade = "F";
        marks.setGrade(grade);

        marks = marksRepository.save(marks);
        recalculateAnalytics(username);
        return marks;
    }

    @Override
    public List<StudentMarks> getMarks(String username) {
        StudentProfile profile = getProfileByUsername(username);
        return marksRepository.findByStudentId(profile.getId());
    }

    @Override
    @Transactional
    public Attendance addOrUpdateAttendance(String username, AttendanceRequest request) {
        StudentProfile profile = getProfileByUsername(username);
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        if (!subject.getStudent().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Attendance attendance = attendanceRepository.findByStudentIdAndSubjectId(profile.getId(), subject.getId())
                .orElse(new Attendance());

        attendance.setStudent(profile);
        attendance.setSubject(subject);
        attendance.setClassesConducted(request.getClassesConducted());
        attendance.setClassesAttended(request.getClassesAttended());

        if (request.getClassesConducted() > 0) {
            attendance.setAttendancePercentage(((double) request.getClassesAttended() / request.getClassesConducted()) * 100);
        } else {
            attendance.setAttendancePercentage(0.0);
        }

        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAttendance(String username) {
        StudentProfile profile = getProfileByUsername(username);
        return attendanceRepository.findByStudentId(profile.getId());
    }

    @Override
    @Transactional
    public void recalculateAnalytics(String username) {
        StudentProfile profile = getProfileByUsername(username);
        List<StudentMarks> allMarks = marksRepository.findByStudentId(profile.getId());

        // We need to group by semester, calculate SGPA for each semester
        // then CGPA overall.
        // First delete existing analytics for this student
        List<Analytics> existingAnalytics = analyticsRepository.findByStudentId(profile.getId());
        analyticsRepository.deleteAll(existingAnalytics);

        double totalOverallCredits = 0;
        double totalOverallGradePoints = 0;

        // Extract distinct semesters
        List<String> semesters = allMarks.stream().map(StudentMarks::getSemester).distinct().sorted().toList();

        for (String sem : semesters) {
            List<StudentMarks> semMarks = allMarks.stream()
                    .filter(m -> m.getSemester().equals(sem))
                    .toList();

            double semCredits = 0;
            double semGradePoints = 0;

            for (StudentMarks m : semMarks) {
                Subject sub = m.getSubject();
                int credits = sub.getCredits();
                double gp = getGradePoint(m.getGrade());
                semCredits += credits;
                semGradePoints += (gp * credits);
            }

            double sgpa = semCredits > 0 ? (semGradePoints / semCredits) : 0;
            sgpa = Math.round(sgpa * 100.0) / 100.0;

            totalOverallCredits += semCredits;
            totalOverallGradePoints += semGradePoints;

            double cgpa = totalOverallCredits > 0 ? (totalOverallGradePoints / totalOverallCredits) : 0;
            cgpa = Math.round(cgpa * 100.0) / 100.0;

            double percentage = (cgpa * 10) - 7.5;
            if (percentage < 0) percentage = 0.0;
            percentage = Math.round(percentage * 100.0) / 100.0;

            Analytics analytics = Analytics.builder()
                    .student(profile)
                    .semester(sem)
                    .sgpa(sgpa)
                    .cgpa(cgpa)
                    .predictedPercentage(percentage)
                    .build();
            analyticsRepository.save(analytics);
            
            // update profile to last semester's values
            profile.setSgpa(sgpa);
            profile.setCgpa(cgpa);
            profile.setPercentage(percentage);
            profileRepository.save(profile);
        }
        
        if(semesters.isEmpty()){
            profile.setSgpa(0.0);
            profile.setCgpa(0.0);
            profile.setPercentage(0.0);
            profileRepository.save(profile);
        }
    }

    private double getGradePoint(String grade) {
        if (grade == null) return 0;
        switch (grade) {
            case "O": return 10.0;
            case "A+": return 9.0;
            case "A": return 8.0;
            case "B": return 7.0;
            case "C": return 6.0;
            default: return 0.0;
        }
    }
}
