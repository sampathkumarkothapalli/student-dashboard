package com.studentdashboard.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequest {
    private Long subjectId;
    private Integer classesConducted;
    private Integer classesAttended;
}
