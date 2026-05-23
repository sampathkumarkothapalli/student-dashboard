package com.studentdashboard.service.impl;

import com.studentdashboard.dto.response.AnalyticsResponse;
import com.studentdashboard.dto.response.DashboardResponse;
import com.studentdashboard.entity.StudentProfile;
import com.studentdashboard.service.AnalyticsService;
import com.studentdashboard.service.DashboardService;
import com.studentdashboard.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ProfileService profileService;
    private final AnalyticsService analyticsService;

    @Override
    public DashboardResponse getDashboardData(String username) {
        StudentProfile profile = profileService.getProfile(username);
        AnalyticsResponse analytics = analyticsService.getAnalytics(username);

        return DashboardResponse.builder()
                .totalSemesters(analytics.getSemesters() != null ? analytics.getSemesters().size() : 0)
                .currentSgpa(analytics.getSgpa())
                .currentCgpa(analytics.getCgpa())
                .overallPercentage(analytics.getPercentage())
                .studentName(profile.getUser() != null ? profile.getUser().getFullName() : null)
                .rollNumber(profile.getUser() != null ? profile.getUser().getRollNumber() : null)
                .department(profile.getDepartment())
                .chartsData(analytics.getSemesters())
                .build();
    }
}
