package com.studentdashboard.service;

import com.studentdashboard.dto.request.SubjectRequest;
import com.studentdashboard.dto.request.MarksRequest;
import com.studentdashboard.dto.request.AttendanceRequest;
import com.studentdashboard.entity.Subject;
import com.studentdashboard.entity.StudentMarks;
import com.studentdashboard.entity.Attendance;

import java.util.List;

public interface AcademicService {
    Subject addSubject(String username, SubjectRequest request);
    void deleteSubject(String username, Long subjectId);
    List<Subject> getSubjects(String username);
    List<Subject> getSubjectsBySemester(String username, String semester);
    
    StudentMarks addOrUpdateMarks(String username, MarksRequest request);
    List<StudentMarks> getMarks(String username);
    
    Attendance addOrUpdateAttendance(String username, AttendanceRequest request);
    List<Attendance> getAttendance(String username);
    
    void recalculateAnalytics(String username);
}
