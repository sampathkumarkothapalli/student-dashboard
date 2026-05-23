package com.studentdashboard.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponse {
    private Double cgpa;
    private Double sgpa;
    private Double percentage;
    private List<SemesterData> semesters;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SemesterData {
        private String semesterName;
        private Double sgpa;
        private Double percentage;
    }
}
