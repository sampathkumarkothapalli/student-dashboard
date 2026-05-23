package com.studentdashboard.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SemesterMarksRequest {
    private String semesterName;
    private List<SubjectMarksRequest> subjects;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubjectMarksRequest {
        private String subjectName;
        private Integer credits;
        private Integer marks;
    }
}
