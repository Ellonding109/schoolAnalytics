// Professional Students Page with drawers, modals, filters, pagination, dark mode
// Full standalone React + Tailwind page component

import React, { useState } from "react";
import { Search, Filter, Plus, X, Edit, Trash2 } from "lucide-react";

export default function StudentsPage() {
  const [selected, setSelected] = useState(null);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const students = [
    { id: 1, name: "David Kiptoo", class: "Form 2 Orange", avg: 78, email: "david@example.com" },
    { id: 2, name: "Mary Chebet", class: "Form 3 Blue", avg: 82, email: "mary@example.com" },
    { id: 3, name: "Brian Rotich", class: "Form 1 White", avg: 65, email: "brian@example.com" },
  ];

  return (
    <div className={dark ? "dark bg-slate-900 text-white min-h-screen p-6" : "bg-slate-50 min-h-screen p-6"}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Students</h2>
        <div className="flex gap-3 items-center">
          <button onClick={() => setDark(!dark)} className="px-4 py-2 bg-slate-800 text-white rounded">{dark ? "Light" : "Dark"} Mode</button>
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"><Plus size={16}/> Add Student</button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input className="w-full pl-10 pr-4 py-2 rounded border dark:bg-slate-800 dark:border-slate-700" placeholder="Search students..." />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded dark:border-slate-700"><Filter size={16}/> Filter</button>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Avg Grade</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                <td className="px-4 py-3" onClick={() => { setSelected(s); setProfileOpen(true); }}>{s.name}</td>
                <td className="px-4 py-3">{s.class}</td>
                <td className="px-4 py-3">{s.avg}%</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setModalOpen(true)} className="mr-2 text-blue-600"><Edit size={18}/></button>
                  <button className="text-red-500"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <div>Showing 1–10 of 128 students</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">Prev</button>
          <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      {/* PROFILE DRAWER */}
      {isProfileOpen && selected && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white dark:bg-slate-800 shadow-xl p-6 animate-slide-left">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{selected.name}</h3>
            <button onClick={() => setProfileOpen(false)}><X size={22}/></button>
          </div>

          <p className="text-slate-500 dark:text-slate-300 mb-2">{selected.email}</p>
          <p className="text-slate-600 dark:text-slate-300 mb-6">Class: <span className="font-medium">{selected.class}</span></p>

          {/* PERFORMANCE CHART */}
          <h4 className="font-semibold mb-3">Performance Trend</h4>
          <svg viewBox="0 0 200 80" className="w-full h-24">
            <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points="0,60 40,50 80,55 120,45 160,40 200,35" />
          </svg>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add / Edit Student</h3>
              <button onClick={() => setModalOpen(false)}><X size={22}/></button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input className="p-2 rounded border dark:bg-slate-700" placeholder="Full name" />
              <input className="p-2 rounded border dark:bg-slate-700" placeholder="Email" />
              <input className="p-2 rounded border dark:bg-slate-700" placeholder="Class" />
              <input className="p-2 rounded border dark:bg-slate-700" placeholder="Avg Grade %" />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
