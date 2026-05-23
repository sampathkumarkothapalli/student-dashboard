package com.studentdashboard.service.impl;

import com.studentdashboard.entity.StudentProfile;
import com.studentdashboard.exception.ResourceNotFoundException;
import com.studentdashboard.repository.StudentProfileRepository;
import com.studentdashboard.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    
    private final StudentProfileRepository profileRepository;

    @Override
    public List<StudentProfile> getAllStudents() {
        return profileRepository.findAll();
    }

    @Override
    public StudentProfile getStudentById(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    }
}
