import React, { useState } from "react";

// Mock Data
const studentPerformanceTrend = [
  { term: "Term 1", avg: 72 },
  { term: "Term 2", avg: 75 },
  { term: "Term 3", avg: 78 },
];

const feePaymentTrend = [
  { month: "Jan", paid: 120, expected: 150 },
  { month: "Feb", paid: 130, expected: 150 },
  { month: "Mar", paid: 145, expected: 150 },
  { month: "Apr", paid: 140, expected: 150 },
];

const riskPrediction = [
  { student: "John Doe", riskLevel: "High", subject: "Math" },
  { student: "Jane Smith", riskLevel: "Medium", subject: "Science" },
  { student: "Sam Lee", riskLevel: "Low", subject: "English" },
];

// --- Components ---
function KPI({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="text-slate-400 text-sm">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${color || "text-slate-800"}`}>{value}</div>
    </div>
  );
}

function LineChart({ data, title }: { data: { term: string; avg: number }[]; title?: string }) {
  const w = 400;
  const h = 120;
  const values = data.map((d) => d.avg);
  const max = Math.max(...values) || 1;
  const min = Math.min(...values);
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  });
  const path = `M ${points.join(" L ")}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {title && <h3 className="text-slate-700 font-semibold mb-3">{title}</h3>}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32">
        <defs>
          <linearGradient id="perfGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d={`${path} L ${w},${h} L 0,${h} Z`} fill="url(#perfGrad)" opacity={0.6} />
      </svg>
    </div>
  );
}

function BarChart({ data, title }: { data: { month: string; paid: number; expected: number }[]; title?: string }) {
  const max = Math.max(...data.map((d) => Math.max(d.paid, d.expected))) || 1;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 overflow-x-auto">
      {title && <h3 className="text-slate-700 font-semibold mb-3">{title}</h3>}
      <div className="flex items-end gap-3 h-32">
        {data.map((d) => (
          <div key={d.month} className="flex-1 text-center">
            <div style={{ height: `${(d.paid / max) * 100}%` }} className="bg-green-500 rounded-t-md mb-1"></div>
            <div style={{ height: `${(d.expected / max) * 100}%` }} className="bg-slate-300 rounded-t-md opacity-50"></div>
            <div className="text-xs mt-1">{d.month}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs mt-2 text-slate-500">
        <span>Paid</span>
        <span>Expected</span>
      </div>
    </div>
  );
}

function RiskTable() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 overflow-x-auto">
      <h3 className="text-slate-700 font-semibold mb-3">At-Risk Students</h3>
      <table className="min-w-full table-auto border-collapse border border-slate-200">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-200 p-2 text-left">Student</th>
            <th className="border border-slate-200 p-2 text-center">Risk Level</th>
            <th className="border border-slate-200 p-2 text-left">Subject</th>
          </tr>
        </thead>
        <tbody>
          {riskPrediction.map((r) => (
            <tr key={r.student}>
              <td className="border border-slate-200 p-2">{r.student}</td>
              <td
                className={`border border-slate-200 p-2 text-center font-semibold ${
                  r.riskLevel === "High"
                    ? "text-red-600"
                    : r.riskLevel === "Medium"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {r.riskLevel}
              </td>
              <td className="border border-slate-200 p-2">{r.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Main Page ---
export default function MLInsightsPage() {
  const [termFilter, setTermFilter] = useState("All Terms");

  return (
    <div className="p-6 w-full bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">ML Insights</h1>

      {/* Controls */}
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
          Refresh Insights
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Predicted Avg Grade" value="79%" color="text-blue-600" />
        <KPI label="Students at Risk" value="12" color="text-red-600" />
        <KPI label="Expected Fee Collection" value="Ksh 1.2M" color="text-green-600" />
        <KPI label="Predicted Attendance" value="95%" color="text-indigo-600" />
      </div>

      {/* Charts */}
      <LineChart data={studentPerformanceTrend} title="Predicted Performance Trend" />
      <BarChart data={feePaymentTrend} title="Fee Payment Trend" />

      {/* Risk Table */}
      <RiskTable />
    </div>
  );
}
