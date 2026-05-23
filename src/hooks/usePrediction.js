import { useState, useMemo } from 'react';
import { mockPredictions } from '../data/mockPredictions';

export function usePrediction() {
  const [predictions] = useState(mockPredictions);

  const getPrediction = (studentId) => {
    return predictions.find((p) => p.studentId === studentId) || null;
  };

  const summaryStats = useMemo(() => {
    const total = predictions.length;
    const avgConfidence =
      total > 0
        ? predictions.reduce((sum, p) => sum + p.confidence, 0) / total
        : 0;
    const declining = predictions.filter((p) => p.trend === 'declining').length;
    const improving = predictions.filter((p) => p.trend === 'improving').length;
    return { total, avgConfidence, declining, improving };
  }, [predictions]);

  return {
    predictions,
    getPrediction,
    summaryStats,
  };
}

export default usePrediction;
