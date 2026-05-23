package com.studentdashboard.controller;

import com.studentdashboard.dto.request.PredictionRequest;
import com.studentdashboard.dto.response.ApiResponse;
import com.studentdashboard.dto.response.PredictionResponse;
import com.studentdashboard.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prediction")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping("/calculate")
    public ResponseEntity<ApiResponse<PredictionResponse>> calculatePrediction(
            Authentication authentication,
            @RequestBody PredictionRequest request) {
        PredictionResponse response = predictionService.calculatePrediction(authentication.getName(), request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Prediction calculated successfully", response));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<PredictionResponse>>> getHistory(Authentication authentication) {
        List<PredictionResponse> history = predictionService.getHistory(authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Prediction history retrieved", history));
    }
}
