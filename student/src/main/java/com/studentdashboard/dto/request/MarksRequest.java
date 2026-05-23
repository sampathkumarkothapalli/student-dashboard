package com.studentdashboard.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarksRequest {
    private Long subjectId;
    private String semester;
    private Double internalMarks;
    private Double externalMarks;
}
