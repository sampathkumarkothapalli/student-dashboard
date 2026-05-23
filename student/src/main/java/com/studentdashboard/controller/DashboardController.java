package com.studentdashboard.controller;

import com.studentdashboard.dto.response.ApiResponse;
import com.studentdashboard.dto.response.DashboardResponse;
import com.studentdashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard(Authentication authentication) {
        DashboardResponse response = dashboardService.getDashboardData(authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Dashboard data retrieved successfully", response));
    }
}
