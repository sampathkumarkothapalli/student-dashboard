package com.studentdashboard.controller;

import com.studentdashboard.dto.response.ApiResponse;
import com.studentdashboard.entity.StudentProfile;
import com.studentdashboard.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final com.studentdashboard.repository.StudentProfileRepository studentRepository;
    private final com.studentdashboard.repository.UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<StudentProfile>> getAllStudents() {
        return ResponseEntity.ok(studentRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody StudentProfile student) {
        if (student.getUser() != null && student.getUser().getId() != null) {
            com.studentdashboard.entity.User user = userRepository.findById(student.getUser().getId()).orElse(null);
            student.setUser(user);
        }
        return ResponseEntity.ok(studentRepository.save(student));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody StudentProfile studentUpdates) {
        StudentProfile existing = studentRepository.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        
        if (studentUpdates.getDepartment() != null) existing.setDepartment(studentUpdates.getDepartment());
        if (studentUpdates.getSemester() != null) existing.setSemester(studentUpdates.getSemester());
        if (studentUpdates.getCgpa() != null) existing.setCgpa(studentUpdates.getCgpa());
        if (studentUpdates.getSgpa() != null) existing.setSgpa(studentUpdates.getSgpa());
        if (studentUpdates.getPercentage() != null) existing.setPercentage(studentUpdates.getPercentage());
        if (studentUpdates.getProfileImage() != null) existing.setProfileImage(studentUpdates.getProfileImage());

        return ResponseEntity.ok(studentRepository.save(existing));
    }
}
