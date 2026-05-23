package com.studentdashboard.service.impl;

import com.studentdashboard.dto.request.PredictionRequest;
import com.studentdashboard.dto.response.PredictionResponse;
import com.studentdashboard.entity.PredictionHistory;
import com.studentdashboard.entity.StudentProfile;
import com.studentdashboard.repository.PredictionRepository;
import com.studentdashboard.service.PredictionService;
import com.studentdashboard.service.ProfileService;
import com.studentdashboard.util.PercentageCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PredictionServiceImpl implements PredictionService {

    private final ProfileService profileService;
    private final PredictionRepository predictionRepository;

    @Override
    public PredictionResponse calculatePrediction(String username, PredictionRequest request) {
        StudentProfile profile = profileService.getProfile(username);
        
        // Mock prediction logic
        double mockPredictedSgpa = 8.5; 
        double mockPredictedCgpa = (profile.getCgpa() != null ? profile.getCgpa() + mockPredictedSgpa : mockPredictedSgpa) / 2.0;
        
        double percentage = PercentageCalculator.calculateFromCgpa(mockPredictedCgpa);

        PredictionHistory history = PredictionHistory.builder()
                .student(profile)
                .predictedSgpa(mockPredictedSgpa)
                .predictedCgpa(mockPredictedCgpa)
                .percentage(percentage)
                .build();

        predictionRepository.save(history);

        return PredictionResponse.builder()
                .id(history.getId())
                .predictedSgpa(mockPredictedSgpa)
                .predictedCgpa(mockPredictedCgpa)
                .percentage(percentage)
                .createdAt(history.getCreatedAt())
                .build();
    }

    @Override
    public List<PredictionResponse> getHistory(String username) {
        StudentProfile profile = profileService.getProfile(username);
        List<PredictionHistory> histories = predictionRepository.findByStudentIdOrderByCreatedAtDesc(profile.getId());
        
        return histories.stream().map(h -> PredictionResponse.builder()
                .id(h.getId())
                .predictedSgpa(h.getPredictedSgpa())
                .predictedCgpa(h.getPredictedCgpa())
                .percentage(h.getPercentage())
                .createdAt(h.getCreatedAt())
                .build()).collect(Collectors.toList());
    }
}
