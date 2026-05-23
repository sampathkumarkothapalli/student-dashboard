package com.studentdashboard.service;

import com.studentdashboard.dto.response.DashboardResponse;

public interface DashboardService {
    DashboardResponse getDashboardData(String username);
}
