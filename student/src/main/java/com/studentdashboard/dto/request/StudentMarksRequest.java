package com.studentdashboard.dto.request;

import lombok.Data;

@Data
public class StudentMarksRequest {
    private Long studentId;
    private Long subjectId;
    private Double internalMarks;
    private Double externalMarks;
    private String semester;
}
