import React, { useState } from 'react';

// Mock Data
const mockKPIs = [
  { id: 'a1', label: 'Average Grade', value: '78%' },
  { id: 'a2', label: 'Pass Rate', value: '92%' },
  { id: 'a3', label: 'Fail Rate', value: '8%' },
  { id: 'a4', label: 'Attendance', value: '96%' },
];

const gradeDistribution = [5, 12, 18, 22, 15, 10, 8]; // Sample bin counts
const monthlyPerformance = [65, 70, 72, 80, 78, 85, 88]; // Sample trend Jan-Jul
const subjectsTrend = [
  { subject: 'Math', term1: 70, term2: 75, term3: 80 },
  { subject: 'Science', term1: 68, term2: 72, term3: 77 },
  { subject: 'English', term1: 75, term2: 78, term3: 82 },
];

// --- Components ---
function KPIGrid({ items }: { items: typeof mockKPIs }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {items.map((kpi) => (
        <div key={kpi.id} className="bg-white rounded-lg shadow-md p-5">
          <div className="text-slate-400 text-sm">{kpi.label}</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data, title }: { data: number[]; title?: string }) {
  const w = 400;
  const h = 120;
  const max = Math.max(...data) || 1;
  const min = Math.min(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  });
  const path = `M ${points.join(' L ')}`;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {title && <h3 className="text-slate-700 font-semibold mb-3">{title}</h3>}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32">
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <path d={`${path} L ${w},${h} L 0,${h} Z`} fill="url(#g1)" opacity={0.6} />
      </svg>
    </div>
  );
}

function BarChart({ data, title }: { data: number[]; title?: string }) {
  const max = Math.max(...data) || 1;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {title && <h3 className="text-slate-700 font-semibold mb-3">{title}</h3>}
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => (
          <div key={i} className="flex-1">
            <div
              style={{ height: `${(d / max) * 100}%`, transition: 'height 400ms' }}
              className="bg-green-500 rounded-t-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SubjectTrendTable() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 overflow-x-auto">
      <h3 className="text-slate-700 font-semibold mb-3">Subject Term Performance</h3>
      <table className="min-w-full table-auto border-collapse border border-slate-200">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-200 p-2 text-left">Subject</th>
            <th className="border border-slate-200 p-2">Term 1</th>
            <th className="border border-slate-200 p-2">Term 2</th>
            <th className="border border-slate-200 p-2">Term 3</th>
          </tr>
        </thead>
        <tbody>
          {subjectsTrend.map((s) => (
            <tr key={s.subject}>
              <td className="border border-slate-200 p-2">{s.subject}</td>
              <td className="border border-slate-200 p-2 text-center">{s.term1}</td>
              <td className="border border-slate-200 p-2 text-center">{s.term2}</td>
              <td className="border border-slate-200 p-2 text-center">{s.term3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AnalyticsPage() {
  const [termFilter, setTermFilter] = useState('All Terms');

  return (
    <div className="p-6 w-full bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Analytics Dashboard</h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select
          value={termFilter}
          onChange={(e) => setTermFilter(e.target.value)}
          className="px-3 py-2 border rounded shadow-sm"
        >
          <option>All Terms</option>
          <option>Term 1</option>
          <option>Term 2</option>
          <option>Term 3</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Refresh Data
        </button>
      </div>

      {/* KPI Cards */}
      <KPIGrid items={mockKPIs} />

      {/* Charts */}
      <LineChart data={monthlyPerformance} title="Monthly Average Grades" />
      <BarChart data={gradeDistribution} title="Grade Distribution" />

      {/* Subject Trend Table */}
      <SubjectTrendTable />
    </div>
  );
}
