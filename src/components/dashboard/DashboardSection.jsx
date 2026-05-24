import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  PointElement, LineElement, BarElement, ArcElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { chartColors as c } from '../../data/academicData';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

const baseScaleOpts = {
  grid: { color: c.gridColor, drawBorder: false },
  ticks: { color: c.tickColor, font: { family: "'Inter', sans-serif", size: 11 } },
};
const baseLegend = {
  labels: { color: 'rgba(255,255,255,0.65)', font: { family: "'Inter', sans-serif", size: 12 }, boxWidth: 14, padding: 16 },
};

const DashboardSection = ({ marks = [], analytics = [], attendance = [] }) => {
  const latestAnalytics = analytics && analytics.length > 0 ? analytics[analytics.length - 1] : null;

  const barColors = [c.primary, c.teal, c.amber, c.coral, c.pink, c.blue, c.lime];

  // 2. Linear Graph - Percentage Trend
  const percentageTrendData = useMemo(() => {
    return {
      labels: analytics.map(a => a.semester || 'Sem'),
      datasets: [
        {
          label: 'Percentage',
          data: analytics.map(a => a.percentage || 0),
          borderColor: c.pink,
          backgroundColor: c.pinkBg,
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: c.pink,
          pointBorderColor: '#fff',
          pointRadius: 5,
        }
      ]
    };
  }, [analytics]);

  const percentageTrendOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: baseScaleOpts, y: { ...baseScaleOpts, min: 0, max: 100 } },
    animation: { duration: 1500, easing: 'easeOutQuart' },
  };

  // 2. Bar - Subject Marks
  const barData = useMemo(() => {
    return {
      labels: marks.map((s) => s.subject && s.subject.subjectName.length > 14 ? s.subject.subjectName.slice(0, 14) + '…' : (s.subject ? s.subject.subjectName : 'Unknown')),
      datasets: [
        {
          label: 'Total Marks',
          data: marks.map((s) => s.totalMarks || 0),
          backgroundColor: marks.map((_, i) => barColors[i % barColors.length]),
          borderRadius: 8, maxBarThickness: 40,
        },
      ],
    };
  }, [marks]);

  const barOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: baseScaleOpts, y: { ...baseScaleOpts, beginAtZero: true, max: 100 } },
    animation: { duration: 1200, easing: 'easeOutQuart' },
  };

  // 3. SGPA Trend Line Chart
  const sgpaTrendData = useMemo(() => {
    return {
      labels: analytics.map(a => a.semester || 'Sem'),
      datasets: [
        {
          label: 'SGPA',
          data: analytics.map(a => a.sgpa || 0),
          borderColor: c.teal,
          backgroundColor: c.tealBg,
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: c.teal,
          pointBorderColor: '#fff',
          pointRadius: 5,
        }
      ]
    };
  }, [analytics]);

  const sgpaTrendOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: baseScaleOpts, y: { ...baseScaleOpts, min: 0, max: 10 } },
    animation: { duration: 1500, easing: 'easeOutQuart' },
  };

  // 4. CGPA Growth Area Chart
  const cgpaGrowthData = useMemo(() => {
    return {
      labels: analytics.map(a => a.semester || 'Sem'),
      datasets: [
        {
          label: 'CGPA Growth',
          data: analytics.map(a => a.cgpa || 0),
          borderColor: c.blue,
          backgroundColor: c.blueBg,
          fill: true,
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: c.blue,
          pointBorderColor: '#fff',
          pointRadius: 5,
        }
      ]
    };
  }, [analytics]);

  const cgpaGrowthOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: baseScaleOpts, y: { ...baseScaleOpts, min: 0, max: 10 } },
    animation: { duration: 1500, easing: 'easeOutQuart' },
  };

  const dashboardStats = [
    { label: 'Current CGPA', value: latestAnalytics?.cgpa?.toFixed(2) || '0.0', icon: '🎯', colorClass: 'blue',  change: '', up: true },
    { label: 'Latest SGPA',  value: latestAnalytics?.sgpa?.toFixed(2) || '0.0', icon: '📈', colorClass: 'teal',  change: '',  up: true },
    { label: 'Total Subjects', value: marks.length,                 icon: '📚', colorClass: 'amber', change: '', up: true },
    { label: 'Current Percentage', value: `${latestAnalytics?.percentage?.toFixed(2) || '0.0'}%`, icon: '✅', colorClass: 'coral', change: '',  up: true },
  ];

  return (
    <section id="dashboard" className="section">
      <div className="section-inner">
        <span className="section-badge scroll-animate">📊 Dashboard</span>
        <h2 className="section-title scroll-animate">Performance Overview</h2>
        <p className="section-subtitle scroll-animate delay-1">
          A real-time snapshot of your academic progress fetched from live database.
        </p>

        <div className="stats-grid">
          {dashboardStats.map((s, i) => (
            <div key={s.label} className={`glass-card stat-card scroll-animate delay-${i + 1}`}>
              <div className={`stat-icon ${s.colorClass}`}>{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="charts-grid">
          <div className="glass-card chart-card scroll-animate delay-1">
            <div className="chart-card-header">
              <span className="chart-card-title">Subject-wise Marks</span>
              <span className="chart-card-tag">Bar</span>
            </div>
            <div className="chart-wrapper">
              {marks.length > 0 ? <Bar data={barData} options={barOpts} /> : <div style={{textAlign: 'center', marginTop: '40px'}}>No marks data available</div>}
            </div>
          </div>

          <div className="glass-card chart-card scroll-animate delay-2">
            <div className="chart-card-header">
              <span className="chart-card-title">Performance Trend (%)</span>
              <span className="chart-card-tag">Line</span>
            </div>
            <div className="chart-wrapper">
              {analytics.length > 0 ? <Line data={percentageTrendData} options={percentageTrendOpts} /> : <div style={{textAlign: 'center', marginTop: '40px'}}>No performance data available</div>}
            </div>
          </div>

          <div className="glass-card chart-card scroll-animate delay-3">
            <div className="chart-card-header">
              <span className="chart-card-title">SGPA Trend</span>
              <span className="chart-card-tag">Line</span>
            </div>
            <div className="chart-wrapper">
              {analytics.length > 0 ? <Line data={sgpaTrendData} options={sgpaTrendOpts} /> : <div style={{textAlign: 'center', marginTop: '40px'}}>No SGPA data available</div>}
            </div>
          </div>

          <div className="glass-card chart-card scroll-animate delay-4">
            <div className="chart-card-header">
              <span className="chart-card-title">CGPA Growth</span>
              <span className="chart-card-tag">Area</span>
            </div>
            <div className="chart-wrapper">
              {analytics.length > 0 ? <Line data={cgpaGrowthData} options={cgpaGrowthOpts} /> : <div style={{textAlign: 'center', marginTop: '40px'}}>No CGPA data available</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
