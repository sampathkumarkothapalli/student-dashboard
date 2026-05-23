package com.studentdashboard.repository;

import com.studentdashboard.entity.PredictionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredictionRepository extends JpaRepository<PredictionHistory, Long> {
    List<PredictionHistory> findByStudentIdOrderByCreatedAtDesc(Long studentId);
}
