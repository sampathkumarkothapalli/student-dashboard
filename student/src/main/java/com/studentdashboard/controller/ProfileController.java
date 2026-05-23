package com.studentdashboard.controller;

import com.studentdashboard.dto.request.ProfileUpdateRequest;
import com.studentdashboard.dto.response.ApiResponse;
import com.studentdashboard.entity.StudentProfile;
import com.studentdashboard.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ApiResponse<StudentProfile>> getProfile(Authentication authentication) {
        StudentProfile profile = profileService.getProfile(authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile retrieved successfully", profile));
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse<StudentProfile>> updateProfile(
            Authentication authentication,
            @RequestBody ProfileUpdateRequest request) {
        StudentProfile profile = profileService.updateProfile(authentication.getName(), request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile updated successfully", profile));
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<String>> uploadProfilePhoto(
            Authentication authentication,
            @RequestParam String photoUrl) {
        String url = profileService.uploadProfilePhoto(authentication.getName(), photoUrl);
        return ResponseEntity.ok(new ApiResponse<>(true, "Photo uploaded successfully", url));
    }
}
