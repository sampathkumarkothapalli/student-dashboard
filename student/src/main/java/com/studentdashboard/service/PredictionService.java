package com.studentdashboard.service;

import com.studentdashboard.dto.request.PredictionRequest;
import com.studentdashboard.dto.response.PredictionResponse;
import java.util.List;

public interface PredictionService {
    PredictionResponse calculatePrediction(String username, PredictionRequest request);
    List<PredictionResponse> getHistory(String username);
}
