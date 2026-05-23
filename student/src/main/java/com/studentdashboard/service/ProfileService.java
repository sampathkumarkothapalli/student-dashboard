package com.studentdashboard.service;

import com.studentdashboard.dto.request.ProfileUpdateRequest;
import com.studentdashboard.entity.StudentProfile;

public interface ProfileService {
    StudentProfile getProfile(String username);
    StudentProfile updateProfile(String username, ProfileUpdateRequest request);
    String uploadProfilePhoto(String username, String photoUrl);
}
