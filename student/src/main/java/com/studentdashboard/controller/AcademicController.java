package com.studentdashboard.controller;

import com.studentdashboard.dto.request.AttendanceRequest;
import com.studentdashboard.dto.request.MarksRequest;
import com.studentdashboard.dto.request.SubjectRequest;
import com.studentdashboard.entity.Attendance;
import com.studentdashboard.entity.StudentMarks;
import com.studentdashboard.entity.Subject;
import com.studentdashboard.service.AcademicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AcademicController {

    private final AcademicService academicService;

    @PostMapping("/subject")
    public ResponseEntity<Subject> addSubject(@AuthenticationPrincipal UserDetails userDetails, @RequestBody SubjectRequest request) {
        return ResponseEntity.ok(academicService.addSubject(userDetails.getUsername(), request));
    }

    @DeleteMapping("/subject/{id}")
    public ResponseEntity<?> deleteSubject(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        academicService.deleteSubject(userDetails.getUsername(), id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getSubjects(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(academicService.getSubjects(userDetails.getUsername()));
    }

    @GetMapping("/subjects/{semester}")
    public ResponseEntity<List<Subject>> getSubjectsBySemester(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String semester) {
        return ResponseEntity.ok(academicService.getSubjectsBySemester(userDetails.getUsername(), semester));
    }

    @PostMapping("/marks")
    public ResponseEntity<StudentMarks> addOrUpdateMarks(@AuthenticationPrincipal UserDetails userDetails, @RequestBody MarksRequest request) {
        return ResponseEntity.ok(academicService.addOrUpdateMarks(userDetails.getUsername(), request));
    }

    @GetMapping("/marks")
    public ResponseEntity<List<StudentMarks>> getMarks(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(academicService.getMarks(userDetails.getUsername()));
    }

    @PostMapping("/attendance")
    public ResponseEntity<Attendance> addOrUpdateAttendance(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(academicService.addOrUpdateAttendance(userDetails.getUsername(), request));
    }

    @GetMapping("/attendance")
    public ResponseEntity<List<Attendance>> getAttendance(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(academicService.getAttendance(userDetails.getUsername()));
    }
}
