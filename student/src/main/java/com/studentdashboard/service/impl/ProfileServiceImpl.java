package com.studentdashboard.service.impl;

import com.studentdashboard.dto.request.ProfileUpdateRequest;
import com.studentdashboard.entity.StudentProfile;
import com.studentdashboard.entity.User;
import com.studentdashboard.exception.ResourceNotFoundException;
import com.studentdashboard.repository.StudentProfileRepository;
import com.studentdashboard.repository.UserRepository;
import com.studentdashboard.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final StudentProfileRepository profileRepository;

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public StudentProfile getProfile(String username) {
        User user = getUserByUsername(username);
        return profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
    }

    @Override
    @Transactional
    public StudentProfile updateProfile(String username, ProfileUpdateRequest request) {
        StudentProfile profile = getProfile(username);
        User user = profile.getUser();
        boolean userUpdated = false;
        
        if (request.getStudentName() != null) { user.setFullName(request.getStudentName()); userUpdated = true; }
        if (request.getRollNumber() != null) { user.setRollNumber(request.getRollNumber()); userUpdated = true; }
        if (request.getEmail() != null) { user.setEmail(request.getEmail()); userUpdated = true; }
        
        if (userUpdated) {
            userRepository.save(user);
        }

        if (request.getDepartment() != null) profile.setDepartment(request.getDepartment());
        if (request.getSemester() != null) profile.setSemester(request.getSemester());
        if (request.getProfileImage() != null) profile.setProfileImage(request.getProfileImage());
        
        // Update academic path
        if (request.getUniversity() != null) profile.setUniversity(request.getUniversity());
        if (request.getRegulation() != null) profile.setRegulation(request.getRegulation());
        if (request.getBranch() != null) profile.setBranch(request.getBranch());

        return profileRepository.save(profile);
    }

    @Override
    public String uploadProfilePhoto(String username, String photoUrl) {
        StudentProfile profile = getProfile(username);
        profile.setProfileImage(photoUrl);
        profileRepository.save(profile);
        return photoUrl;
    }
}
