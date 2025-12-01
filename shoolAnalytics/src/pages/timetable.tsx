// src/pages/TimetablePage.tsx
// Professional + Interactive Timetable Page
// Features:
// - Drag & Drop timetable grid
// - Well‑defined time slots & days
// - Auto-generate button (to trigger Python/ML backend)
// - Lesson editor modal
// - Lesson card preview
// - Smooth animations
// - Dark mode support
// - Clean UI with Tailwind

import React, { useState } from "react";
import { Plus, Settings, Loader2, Wand2, Trash2, Edit } from "lucide-react";

// ---------------------------------------------------------------------------
// Interfaces (API-ready)
// ---------------------------------------------------------------------------
interface Lesson {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  color: string; // for lesson card
}

interface SlotData {
  slotId: string;
  lesson: Lesson | null;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; 
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
];

// Colors for lessons
const colors = ["#4F46E5", "#0EA5E9", "#10B981", "#EF4444", "#F59E0B"];

// ---------------------------------------------------------------------------
// Timetable Page
// ---------------------------------------------------------------------------
export default function TimetablePage() {
  const [draggingLesson, setDraggingLesson] = useState<Lesson | null>(null);
  const [timetable, setTimetable] = useState<Record<string, SlotData>>({});
  const [adding, setAdding] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [processing, setProcessing] = useState(false);

  // -----------------------------------------------------------------------
  // Drag Handlers
  // -----------------------------------------------------------------------
  const onDropLesson = (slotId: string) => {
    if (!draggingLesson) return;
    setTimetable((prev) => ({
      ...prev,
      [slotId]: { slotId, lesson: draggingLesson },
    }));
    setDraggingLesson(null);
  };

  const clearSlot = (slotId: string) => {
    setTimetable((prev) => ({
      ...prev,
      [slotId]: { slotId, lesson: null },
    }));
  };

  // -----------------------------------------------------------------------
  // Auto-generate (Trigger Python)
  // -----------------------------------------------------------------------
  const autoGenerateTimetable = async () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert("Auto-generated timetable (placeholder). Connect to backend Python ML API.");
    }, 1500);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Title Row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Timetable</h1>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700"
            onClick={() => setAdding(true)}
          >
            <Plus size={18} /> Add Lesson
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-xl dark:border-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Settings size={18} /> Settings
          </button>
          <button
            onClick={autoGenerateTimetable}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700"
          >
            {processing ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
            Auto-Generate
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Lessons List */}
        <div className="col-span-3 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Lessons</h2>

          <div className="space-y-3">
            {mockLessons.map((lesson) => (
              <div
                key={lesson.id}
                draggable
                onDragStart={() => setDraggingLesson(lesson)}
                className="p-4 rounded-xl cursor-grab active:cursor-grabbing shadow-sm text-white"
                style={{ backgroundColor: lesson.color }}
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className="font-semibold">{lesson.subject}</div>
                <div className="text-sm opacity-90">{lesson.teacher}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Timetable Grid */}
        <div className="col-span-9 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Time</th>
                {days.map((day) => (
                  <th key={day} className="p-3 text-center text-gray-700 dark:text-gray-300">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot) => (
                <tr key={slot} className="border-t dark:border-gray-700">
                  <td className="p-3 text-gray-700 dark:text-gray-300 font-medium">{slot}</td>
                  {days.map((day) => {
                    const slotId = `${day}-${slot}`;
                    const current = timetable[slotId]?.lesson || null;

                    return (
                      <td
                        key={slotId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => onDropLesson(slotId)}
                        className="p-2 h-24 border-l dark:border-gray-700 align-top"
                      >
                        {current ? (
                          <div
                            className="relative h-full rounded-xl p-3 text-white shadow cursor-pointer"
                            style={{ backgroundColor: current.color }}
                            onClick={() => setSelectedLesson(current)}
                          >
                            <div className="font-semibold text-sm">{current.subject}</div>
                            <div className="text-xs opacity-90">{current.teacher}</div>
                            <button
                              onClick={(e) => { e.stopPropagation(); clearSlot(slotId); }}
                              className="absolute top-2 right-2 bg-white/20 p-1 rounded hover:bg-white/40"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="h-full rounded-xl bg-gray-100 dark:bg-gray-700 border border-dashed text-gray-400 flex items-center justify-center">
                            Drag lesson here
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lesson Editor Modal / Add Lesson Modal */}
      {adding && <AddLessonModal onClose={() => setAdding(false)} />}
      {selectedLesson && <LessonProfileDrawer lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Additional Professional UI Components
// ---------------------------------------------------------------------------

const mockLessons: Lesson[] = [
  { id: "1", subject: "Mathematics", teacher: "Mr. Kiptoo", room: "R01", color: colors[0] },
  { id: "2", subject: "English", teacher: "Mrs. Achieng", room: "R12", color: colors[1] },
  { id: "3", subject: "Biology", teacher: "Dr. Cheruiyot", room: "Lab 2", color: colors[2] },
  { id: "4", subject: "History", teacher: "Mr. Kimani", room: "R09", color: colors[3] },
  { id: "5", subject: "Chemistry", teacher: "Ms. Mutheu", room: "Lab 1", color: colors[4] },
];

// Lesson Drawer (Profile)
function LessonProfileDrawer({ lesson, onClose }: { lesson: Lesson; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
      <div className="w-96 h-full bg-white dark:bg-gray-800 p-6 shadow-xl animate-slideLeft">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{lesson.subject}</h2>

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300">Teacher: {lesson.teacher}</p>
          <p className="text-gray-600 dark:text-gray-300">Room: {lesson.room}</p>
        </div>

        <div className="flex gap-3 mt-8">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2">
            <Edit size={16} /> Edit Lesson
          </button>
          <button onClick={onClose} className="px-4 py-2 border rounded-xl dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

  
