package com.studentdashboard.repository;

import com.studentdashboard.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {
    List<Semester> findByStudentId(Long studentId);
    Optional<Semester> findByStudentIdAndSemesterName(Long studentId, String semesterName);
}
