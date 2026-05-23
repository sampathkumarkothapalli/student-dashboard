package com.studentdashboard.service.impl;

import com.studentdashboard.dto.response.AnalyticsResponse;
import com.studentdashboard.entity.Semester;
import com.studentdashboard.entity.StudentProfile;
import com.studentdashboard.exception.ResourceNotFoundException;
import com.studentdashboard.repository.SemesterRepository;
import com.studentdashboard.service.AnalyticsService;
import com.studentdashboard.service.ProfileService;
import com.studentdashboard.util.CgpaCalculator;
import com.studentdashboard.util.PercentageCalculator;
import com.studentdashboard.util.SgpaCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final ProfileService profileService;
    private final SemesterRepository semesterRepository;

    @Override
    public AnalyticsResponse getAnalytics(String username) {
        StudentProfile profile = profileService.getProfile(username);
        return AnalyticsResponse.builder()
                .cgpa(profile.getCgpa() != null ? profile.getCgpa() : 0.0)
                .sgpa(profile.getSgpa() != null ? profile.getSgpa() : 0.0)
                .percentage(profile.getPercentage() != null ? profile.getPercentage() : 0.0)
                .build();
    }

    @Override
    public AnalyticsResponse.SemesterData getSemesterAnalytics(String username, Long semesterId) {
        return AnalyticsResponse.SemesterData.builder().build();
    }

    @Override
    public Object getChartsData(String username) {
        return null;
    }
}
