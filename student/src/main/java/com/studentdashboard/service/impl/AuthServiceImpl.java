package com.studentdashboard.service.impl;

import com.studentdashboard.config.JwtUtil;
import com.studentdashboard.dto.request.LoginRequest;
import com.studentdashboard.dto.request.SignupRequest;
import com.studentdashboard.dto.response.LoginResponse;
import com.studentdashboard.entity.Role;
import com.studentdashboard.entity.StudentProfile;
import com.studentdashboard.entity.User;
import com.studentdashboard.exception.ValidationException;
import com.studentdashboard.repository.StudentProfileRepository;
import com.studentdashboard.repository.UserRepository;
import com.studentdashboard.security.CustomUserDetails;
import com.studentdashboard.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final StudentProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public void signup(SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ValidationException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ValidationException("Email is already in use");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_STUDENT)
                .fullName(request.getStudentName() != null ? request.getStudentName() : request.getUsername())
                .rollNumber(request.getRollNumber())
                .build();

        User savedUser = userRepository.save(user);

        StudentProfile profile = StudentProfile.builder()
                .user(savedUser)
                .department(request.getDepartment())
                .build();

        profileRepository.save(profile);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUsernameOrEmail(request.getUsername(), request.getUsername())
                .orElseThrow(() -> new ValidationException("Invalid username/email or password"));

        String token = jwtUtil.generateToken(new CustomUserDetails(user));

        return LoginResponse.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .fullName(user.getFullName())
                .rollNumber(user.getRollNumber())
                .build();
    }

    @Override
    public void logout() {
    }

    @Override
    public String forgotPassword(String email) {
        User user = userRepository.findByUsernameOrEmail(email, email)
                .orElseThrow(() -> new ValidationException("User not found with email: " + email));

        // Generate a reset token (using standard JWT but with short expiration)
        // Normally you would store this in DB or cache, but JWT is stateless
        java.util.Map<String, Object> claims = new java.util.HashMap<>();
        claims.put("type", "reset-password");
        
        // Use custom token generation with 15 mins expiration (900000 ms)
        String resetToken = io.jsonwebtoken.Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new java.util.Date(System.currentTimeMillis()))
                .setExpiration(new java.util.Date(System.currentTimeMillis() + 900000))
                .signWith(io.jsonwebtoken.security.Keys.hmacShaKeyFor(io.jsonwebtoken.io.Decoders.BASE64.decode(jwtUtil.getSecretKey())), io.jsonwebtoken.SignatureAlgorithm.HS256)
                .compact();
                
        return resetToken;
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        try {
            String username = io.jsonwebtoken.Jwts.parserBuilder()
                    .setSigningKey(io.jsonwebtoken.security.Keys.hmacShaKeyFor(io.jsonwebtoken.io.Decoders.BASE64.decode(jwtUtil.getSecretKey())))
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
                    
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new ValidationException("Invalid token"));
                    
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } catch (Exception e) {
            throw new ValidationException("Invalid or expired reset token");
        }
    }
}
