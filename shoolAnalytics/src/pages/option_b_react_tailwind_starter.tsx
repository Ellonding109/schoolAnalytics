/*
Option B - React + Tailwind Starter (single-file snapshot)

How to use:
1. Create a new Vite React + TypeScript project:
   npm create vite@latest my-dashboard -- --template react-ts
2. Install Tailwind CSS (JIT) following Tailwind docs for Vite.
3. Replace src/App.tsx with this file's contents, and ensure Tailwind styles are imported in src/index.css.
4. Run: npm install && npm run dev

Notes:
- This single-file contains a lightweight component library (Sidebar, KPI cards, Timetable grid placeholder, SVG charts) with responsive Tailwind layout matching the selected visual.
- No external chart libraries are required here; charts are rendered via small SVG components so the app runs without extra deps.
- For production-grade charts, swap the LineChart and BarChart with Recharts / Chart.js and read the data from your API.
- This scaffold is intentionally modular so it can expand into the full Option C later (tenants, audit, scheduling scenarios, etc.).
*/

import React from 'react';

type KPI = { id: string; label: string; value: string; icon?: React.ReactNode };

const mockKPIs: KPI[] = [
  { id: 'k1', label: 'Students', value: '150' },
  { id: 'k2', label: 'Classes', value: '12' },
  { id: 'k3', label: 'Alerts', value: '2' },
  { id: 'k4', label: 'Attendance', value: '98%' }
];

const recentActivity = [
  { id: 1, text: '2 students moved to new classes', time: '2 days ago' },
  { id: 2, text: 'New student enrolled', time: '4 days ago' },
  { id: 3, text: '1 class moved to new teacher', time: '1 week ago' },
  { id: 4, text: 'Exam results uploaded', time: '2 weeks ago' }
];

const avgGrades = [60, 68, 72, 80, 76, 85, 88]; // months Jan..Jul sample
const distribution = [22, 25, 35, 24, 12]; // sample bins
const gradesTrend = [68, 72, 74]; // Term1..Term3

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-slate-100 hidden md:flex flex-col p-6 gap-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">T</div>
        <h1 className="text-lg font-semibold">Teach</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-3">
          <NavItem label="Dashboard" />
          <NavItem label="Students" />
          <NavItem label="Classes" />
          <NavItem label="Timetable" />
          <NavItem label="Analytics" />
          <NavItem label="ML Insights" />
          <NavItem label="Admin" />
        </ul>
      </nav>
      <div className="text-sm text-slate-400">v0.1 • Option B</div>
    </aside>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <li>
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 transition-colors">
        <span className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center">•</span>
        <span>{label}</span>
      </a>
    </li>
  );
}

function Topbar() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-200/10 md:hidden">
      <div className="flex items-center gap-3">
        <button aria-label="menu" className="p-2 rounded hover:bg-slate-100/5">☰</button>
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-slate-400">John Doe</div>
      </div>
    </header>
  );
}

function KPIGrid({ items }: { items: KPI[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((k) => (
        <div key={k.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 text-sm">{k.label}</div>
            <div className="text-2xl font-semibold">{k.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm h-full">
      {title && <h3 className="text-slate-700 font-semibold mb-3">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

function LineChart({ data }: { data: number[] }) {
  // Simple responsive SVG line chart
  const w = 400; // viewBox width
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
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d={`${path} L ${w},${h} L 0,${h} Z`} fill="url(#g1)" opacity={0.6} />
    </svg>
  );
}

function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data) || 1;
  return (
    <div className="flex items-end gap-3 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1">
          <div style={{ height: `${(d / max) * 100}%`, transition: 'height 400ms' }} className="bg-sky-500 rounded-t-md" />
        </div>
      ))}
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="space-y-3">
      {recentActivity.map((r) => (
        <div key={r.id} className="flex justify-between items-start">
          <div className="text-slate-700">{r.text}</div>
          <div className="text-slate-400 text-sm">{r.time}</div>
        </div>
      ))}
    </div>
  );
}

function DashboardMain() {
  return (
    <main className="p-6 grid gap-6 grid-rows-[auto]">
      <KPIGrid items={mockKPIs} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Recent Activity">
            <RecentActivity />
          </Card>
        </div>
        <div>
          <Card title="Average Grades">
            <LineChart data={avgGrades} />
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Distribution">
          <BarChart data={distribution} />
        </Card>
        <Card title="Grades Trend">
          <LineChart data={gradesTrend} />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Timetable (preview)">
          <TimetablePreview />
        </Card>
        <Card title="Quick Actions">
          <div className="space-y-3">
            <button className="px-4 py-2 bg-slate-800 text-white rounded">Optimize Timetable</button>
            <button className="px-4 py-2 border border-slate-200 rounded">Upload Results (CSV)</button>
            <button className="px-4 py-2 border border-slate-200 rounded">Export Report (PDF)</button>
          </div>
        </Card>
      </div>
    </main>
  );
}

function TimetablePreview() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const slots = ['08:00', '09:00', '10:00', '11:00'];
  return (
    <div className="overflow-auto">
      <div className="min-w-[560px]">
        <div className="grid grid-cols-6 border rounded">
          <div className="p-2 bg-slate-50 border-r">&nbsp;</div>
          {days.map((d) => (
            <div key={d} className="p-2 font-medium text-slate-600 border-r bg-white">{d}</div>
          ))}

          {slots.map((s) => (
            <React.Fragment key={s}>
              <div className="p-2 text-sm text-slate-500 border-t border-r bg-slate-50">{s}</div>
              {days.map((d) => (
                <div key={d + s} className="p-2 border-t border-r h-16">
                  {/* sample lesson */}
                  {Math.random() > 0.7 ? (
                    <div className="bg-slate-100 rounded px-2 py-1 text-xs">Math - R02</div>
                  ) : null}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <div className="md:flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Dashboard</h2>
              <div className="flex items-center gap-3">
                <input
                  className="px-3 py-2 rounded border border-slate-200 bg-white text-sm"
                  placeholder="Search students, classes..."
                />
                <div className="text-sm text-slate-500">John Doe ▾</div>
              </div>
            </div>
            <DashboardMain />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Students Page (Responsive Scaffold Added) ---

export function StudentsPage() {
  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Students</h1>

      <section className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Students List</h2>
        <p className="text-gray-500 mb-4">A responsive table for managing students will be added here.</p>
        <div className="text-gray-400">[TABLE PLACEHOLDER]</div>
      </section>
    </div>
  );
}

// --- Router Integration (to be placed inside App.tsx) ---
// <Link to="/students" className="block px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">Students</Link>
// <Route path="/students" element={<StudentsPage />} />

