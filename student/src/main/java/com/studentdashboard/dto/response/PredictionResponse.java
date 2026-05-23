package com.studentdashboard.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictionResponse {
    private Long id;
    private Double predictedSgpa;
    private Double predictedCgpa;
    private Double percentage;
    private LocalDateTime createdAt;
}
