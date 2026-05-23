package com.studentdashboard.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRequest {
    private String studentName;
    private String rollNumber;
    private String department;
    private String semester;
    private String profileImage;
    private String email;
    private String university;
    private String regulation;
    private String branch;
}
