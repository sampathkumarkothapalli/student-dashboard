package com.studentdashboard.repository;

import com.studentdashboard.entity.StudentMarks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MarksRepository extends JpaRepository<StudentMarks, Long> {
    List<StudentMarks> findByStudentId(Long studentId);
    Optional<StudentMarks> findByStudentIdAndSubjectId(Long studentId, Long subjectId);
}
