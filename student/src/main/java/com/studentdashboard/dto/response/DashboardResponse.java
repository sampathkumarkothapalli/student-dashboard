package com.studentdashboard.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {
    private Integer totalSemesters;
    private Double currentSgpa;
    private Double currentCgpa;
    private Double overallPercentage;
    private String studentName;
    private String rollNumber;
    private String department;
    private Object chartsData;
}
