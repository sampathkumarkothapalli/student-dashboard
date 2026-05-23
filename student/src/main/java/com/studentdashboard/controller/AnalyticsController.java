package com.studentdashboard.controller;

import com.studentdashboard.entity.Analytics;
import com.studentdashboard.entity.StudentProfile;
import com.studentdashboard.repository.AnalyticsRepository;
import com.studentdashboard.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.studentdashboard.entity.User;
import com.studentdashboard.repository.UserRepository;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsRepository analyticsRepository;
    private final StudentProfileRepository profileRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Analytics>> getAnalytics(Authentication authentication, @RequestParam(required = false) Long studentId) {
        if (studentId != null) {
            return ResponseEntity.ok(analyticsRepository.findByStudentId(studentId));
        }
        if (authentication != null && authentication.getName() != null) {
            User user = userRepository.findByUsername(authentication.getName()).orElse(null);
            if (user != null) {
                StudentProfile profile = profileRepository.findByUserId(user.getId()).orElse(null);
                if (profile != null) {
                    return ResponseEntity.ok(analyticsRepository.findByStudentId(profile.getId()));
                }
            }
        }
        return ResponseEntity.ok(analyticsRepository.findAll());
    }

    @PostMapping("/calculate")
    public ResponseEntity<?> calculateAnalytics(@RequestParam Long studentId, @RequestParam String semester, @RequestParam Double sgpa, @RequestParam Double cgpa) {
        StudentProfile student = profileRepository.findById(studentId).orElse(null);
        if (student == null) {
            return ResponseEntity.badRequest().body("Student not found");
        }

        Double predicted = (sgpa * 10) - 7.5;

        Analytics analytics = Analytics.builder()
                .student(student)
                .semester(semester)
                .sgpa(sgpa)
                .cgpa(cgpa)
                .predictedPercentage(predicted)
                .build();

        return ResponseEntity.ok(analyticsRepository.save(analytics));
    }
}
