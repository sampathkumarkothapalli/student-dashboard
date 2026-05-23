import { useState, useMemo } from 'react';
import { useStudents } from './useStudents';
import { usePrediction } from './usePrediction';

export function useAnalytics() {
  const { allStudents, stats: studentStats } = useStudents();
  const { predictions, summaryStats } = usePrediction();

  const gradeDistribution = useMemo(() => {
    const dist = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    allStudents.forEach((s) => {
      if (dist[s.grade] !== undefined) dist[s.grade]++;
    });
    return dist;
  }, [allStudents]);

  const riskDistribution = useMemo(() => {
    const dist = { low: 0, medium: 0, high: 0 };
    allStudents.forEach((s) => {
      if (dist[s.riskLevel] !== undefined) dist[s.riskLevel]++;
    });
    return dist;
  }, [allStudents]);

  return {
    studentStats,
    predictionStats: summaryStats,
    gradeDistribution,
    riskDistribution,
  };
}

export default useAnalytics;
