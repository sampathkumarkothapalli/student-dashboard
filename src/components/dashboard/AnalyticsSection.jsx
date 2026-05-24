import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { chartColors as c } from '../../data/academicData';
import DataTable from './DataTable';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler
);

const baseScale = {
  grid: { color: c.gridColor, drawBorder: false },
  ticks: { color: c.tickColor, font: { family: "'Inter', sans-serif", size: 11 } },
};

const AnalyticsSection = ({ marks = [], analytics = [], attendance = [] }) => {
  const latestAnalytics = analytics && analytics.length > 0 ? analytics[analytics.length - 1] : { sgpa: 0, cgpa: 0, percentage: 0 };
  const displayPercentage = latestAnalytics.percentage || (latestAnalytics.cgpa > 0 ? ((latestAnalytics.cgpa * 10) - 7.5) : 0);

  const barColors = [c.primary, c.teal, c.amber, c.coral, c.pink, c.blue, c.lime];
  const subjectBar = useMemo(() => ({
    labels: marks.map((m) =>
      m.subject && m.subject.subjectName.length > 16 
        ? m.subject.subjectName.slice(0, 16) + '…' 
        : (m.subject ? m.subject.subjectName : 'Unknown')
    ),
    datasets: [
      {
        label: 'Total Marks',
        data: marks.map((m) => m.totalMarks || 0),
        backgroundColor: marks.map((_, i) => barColors[i % barColors.length]),
        borderRadius: 8, maxBarThickness: 44,
      },
    ],
  }), [marks]);

  const columns = [
    { key: 'semester', label: 'Semester' },
    { key: 'subjectName', label: 'Subject' },
    { key: 'credits', label: 'Credits' },
    { key: 'internalMarks', label: 'Internal' },
    { key: 'externalMarks', label: 'External' },
    { key: 'totalMarks', label: 'Total' },
    { key: 'grade', label: 'Grade' },
    { key: 'attendance', label: 'Attendance %' }
  ];

  const tableData = useMemo(() => marks.map(m => {
    const att = attendance.find(a => a.subject?.id === m.subject?.id);
    return {
      semester: m.subject?.semester || 'N/A',
      subjectName: m.subject ? m.subject.subjectName : 'N/A',
      credits: m.subject?.credits || 0,
      internalMarks: m.internalMarks || 0,
      externalMarks: m.externalMarks || 0,
      totalMarks: m.totalMarks || 0,
      grade: m.grade || 'N/A',
      attendance: att ? `${att.attendancePercentage}%` : 'N/A'
    };
  }), [marks, attendance]);

  const attendanceBarData = useMemo(() => ({
    labels: attendance.map(a => a.subject?.subjectName || 'Unknown'),
    datasets: [
      {
        label: 'Attendance %',
        data: attendance.map(a => a.attendancePercentage || 0),
        backgroundColor: attendance.map(a => (a.attendancePercentage >= 75 ? c.teal : c.coral)),
        borderRadius: 8, maxBarThickness: 40,
      }
    ]
  }), [attendance]);

  const attendanceBarOpts = {
    indexAxis: 'y',
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { ...baseScale, max: 100 }, y: baseScale },
    animation: { duration: 1200, easing: 'easeOutQuart' },
  };

  return (
    <section id="analytics" className="section">
      <div className="section-inner">
        <span className="section-badge scroll-animate">📈 Analytics</span>
        <h2 className="section-title scroll-animate">Performance Analytics</h2>
        <p className="section-subtitle scroll-animate delay-1">
          Detailed overview of your academic marks and analytics.
        </p>

          <>
            <div className="analytics-overview scroll-animate delay-2">
              <div className="glass-card analytics-stat">
                <div className="analytics-stat-value">{latestAnalytics.sgpa?.toFixed(2) || '0.00'}</div>
                <div className="analytics-stat-label">SGPA</div>
              </div>
              <div className="glass-card analytics-stat">
                <div className="analytics-stat-value">{latestAnalytics.cgpa?.toFixed(2) || '0.00'}</div>
                <div className="analytics-stat-label">CGPA</div>
              </div>
              <div className="glass-card analytics-stat">
                <div className="analytics-stat-value">{displayPercentage.toFixed(2)}%</div>
                <div className="analytics-stat-label">Percentage</div>
              </div>
            </div>

            <div className="glass-card analytics-table-wrapper scroll-animate">
              <h3 style={{ marginBottom: '15px' }}>Subject Marks Detail</h3>
              <DataTable 
                columns={columns} 
                data={tableData} 
                searchField="subjectName" 
                filterField="grade" 
              />
            </div>

            <div className="analytics-charts">
              <div className="glass-card chart-card scroll-animate">
                <div className="chart-card-header">
                  <span className="chart-card-title">Subject Marks Overview</span>
                  <span className="chart-card-tag">Bar</span>
                </div>
                <div className="chart-wrapper">
                  {marks.length > 0 ? (
                    <Bar
                      data={subjectBar}
                      options={{
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { x: baseScale, y: { ...baseScale, beginAtZero: true, max: 100 } },
                        animation: { duration: 900, easing: 'easeOutQuart' },
                      }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>No marks data available to visualize.</div>
                  )}
                </div>
              </div>

              <div className="glass-card chart-card scroll-animate">
                <div className="chart-card-header">
                  <span className="chart-card-title">Attendance Tracking</span>
                  <span className="chart-card-tag">Progress</span>
                </div>
                <div className="chart-wrapper">
                  {attendance.length > 0 ? (
                    <Bar data={attendanceBarData} options={attendanceBarOpts} />
                  ) : (
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>No attendance data available.</div>
                  )}
                </div>
              </div>
            </div>


          </>
      </div>
    </section>
  );
};

export default AnalyticsSection;
