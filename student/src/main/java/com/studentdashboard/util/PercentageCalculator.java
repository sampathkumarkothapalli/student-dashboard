package com.studentdashboard.util;

public class PercentageCalculator {
    public static Double calculateFromSgpa(Double sgpa) {
        if (sgpa == null || sgpa == 0.0) return 0.0;
        double percentage = (sgpa * 10) - 7.5;
        return Math.max(percentage, 0.0);
    }
    
    public static Double calculateFromCgpa(Double cgpa) {
        if (cgpa == null || cgpa == 0.0) return 0.0;
        double percentage = (cgpa * 10) - 7.5;
        return Math.max(percentage, 0.0);
    }
}
