package com.studentdashboard.service;

import com.studentdashboard.dto.request.LoginRequest;
import com.studentdashboard.dto.request.SignupRequest;
import com.studentdashboard.dto.response.LoginResponse;

public interface AuthService {
    void signup(SignupRequest request);
    LoginResponse login(LoginRequest request);
    void logout();

    String forgotPassword(String email);

    void resetPassword(String token, String newPassword);
}
