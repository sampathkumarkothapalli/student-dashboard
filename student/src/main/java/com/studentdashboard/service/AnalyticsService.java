package com.studentdashboard.service;

import com.studentdashboard.dto.response.AnalyticsResponse;

public interface AnalyticsService {
    AnalyticsResponse getAnalytics(String username);
    AnalyticsResponse.SemesterData getSemesterAnalytics(String username, Long semesterId);
    Object getChartsData(String username);
}
