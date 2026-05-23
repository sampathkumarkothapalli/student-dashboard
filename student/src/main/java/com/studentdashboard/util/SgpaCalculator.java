package com.studentdashboard.util;

import com.studentdashboard.entity.StudentMarks;
import java.util.List;

public class SgpaCalculator {
    public static Double calculate(List<StudentMarks> marksList) {
        if (marksList == null || marksList.isEmpty()) return 0.0;
        
        double totalCredits = 0.0;
        double earnedPoints = 0.0;

        for (StudentMarks marks : marksList) {
            if (marks.getSubject() != null && marks.getSubject().getCredits() != null && marks.getTotalMarks() != null) {
                double gradePoint = getGradePoint(marks.getTotalMarks());
                double credits = marks.getSubject().getCredits();
                earnedPoints += (gradePoint * credits);
                totalCredits += credits;
            }
        }

        if (totalCredits == 0) return 0.0;
        return earnedPoints / totalCredits;
    }

    private static double getGradePoint(Double marks) {
        if (marks >= 90) return 10.0;
        else if (marks >= 80) return 9.0;
        else if (marks >= 70) return 8.0;
        else if (marks >= 60) return 7.0;
        else if (marks >= 50) return 6.0;
        else if (marks >= 40) return 5.0;
        else return 0.0; // Fail
    }
}
