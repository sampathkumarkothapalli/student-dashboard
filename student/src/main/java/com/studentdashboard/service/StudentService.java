package com.studentdashboard.service;

import com.studentdashboard.entity.StudentProfile;
import java.util.List;

public interface StudentService {
    List<StudentProfile> getAllStudents();
    StudentProfile getStudentById(Long id);
}
