package com.studentdashboard.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectRequest {
    private Long id;
    private String subjectCode;
    private String subjectName;
    private Boolean customSubject;
    private Integer credits;
    private String semester;
}
