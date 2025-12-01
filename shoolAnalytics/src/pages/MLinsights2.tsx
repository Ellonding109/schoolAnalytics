import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

// --- Mock Data ---
const mockPerformanceTrend = [
  { term: "Term 1", avg: 72 },
  { term: "Term 2", avg: 75 },
  { term: "Term 3", avg: 78 },
];

const mockFeeTrend = [
  { month: "Jan", paid: 120, expected: 150 },
  { month: "Feb", paid: 130, expected: 150 },
  { month: "Mar", paid: 145, expected: 150 },
  { month: "Apr", paid: 140, expected: 150 },
];

const mockRiskData = [
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

function PerformanceChart({ data }: { data: { term: string; avg: number }[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-slate-700 font-semibold mb-3">Predicted Performance Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="term" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Line
            type="monotone"
            dataKey="avg"
            stroke="#1d4ed8"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function FeeChart({ data }: { data: { month: string; paid: number; expected: number }[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-slate-700 font-semibold mb-3">Fee Collection Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => `Ksh ${value}k`} />
          <Legend />
          <Bar dataKey="paid" fill="#10b981" />
          <Bar dataKey="expected" fill="#d1d5db" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function RiskTable({ data }: { data: { student: string; riskLevel: string; subject: string }[] }) {
  const getColor = (risk: string) =>
    risk === "High" ? "text-red-600" : risk === "Medium" ? "text-yellow-500" : "text-green-600";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 overflow-x-auto">
      <h3 className="text-slate-700 font-semibold mb-3">Students At Risk</h3>
      <table className="min-w-full table-auto border-collapse border border-slate-200">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-200 p-2 text-left">Student</th>
            <th className="border border-slate-200 p-2 text-center">Risk Level</th>
            <th className="border border-slate-200 p-2 text-left">Subject</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.student}>
              <td className="border border-slate-200 p-2">{r.student}</td>
              <td className={`border border-slate-200 p-2 text-center font-semibold ${getColor(r.riskLevel)}`}>
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
  const [performanceData, setPerformanceData] = useState(mockPerformanceTrend);
  const [feeData, setFeeData] = useState(mockFeeTrend);
  const [riskData, setRiskData] = useState(mockRiskData);

  // Simulate API fetch (replace with real fetch)
  const fetchInsights = () => {
    console.log("Fetching ML insights from API...");
    // Example: fetch("/api/ml/insights").then(...).then(data => setPerformanceData(data.performance))
  };

  useEffect(() => {
    fetchInsights();
  }, [termFilter]);

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
        <button
          onClick={fetchInsights}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Refresh Insights
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Predicted Avg Grade" value="79%" color="text-blue-600" />
        <KPI label="Students at Risk" value="12" color="text-red-600" />
        <KPI label="Expected Fee Collection" value="Ksh 1.2M" color="text-green-600" />
        <KPI label="Predicted Attendance" value="95%" color="text-indigo-600" />
      </div>

      {/* Charts */}
      <PerformanceChart data={performanceData} />
      <FeeChart data={feeData} />

      {/* At-Risk Table */}
      <RiskTable data={riskData} />
    </div>
  );
}
