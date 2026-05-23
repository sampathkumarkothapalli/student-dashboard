package com.studentdashboard.repository;

import com.studentdashboard.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByStudentId(Long studentId);
    List<Subject> findByStudentIdAndSemester(Long studentId, String semester);
}
