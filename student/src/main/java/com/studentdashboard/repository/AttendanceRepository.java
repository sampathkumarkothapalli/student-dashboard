package com.studentdashboard.repository;

import com.studentdashboard.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);
    java.util.Optional<Attendance> findByStudentIdAndSubjectId(Long studentId, Long subjectId);
}
