import React, { useState } from "react";
import Analytics from "./pages/analytics";
import Students from "./pages/students";
import AdminSettings from "./pages/AdminSettings";
import Timetable from "./pages/timetable";
import StudentManagement from "./pages/studentsManagement";
import MLInsights from "./pages/MLinsights";
import Classes from "./pages/classes";

function App() {
  const [page, setPage] = useState("Analytics");

  const renderPage = () => {
    switch (page) {
      case "Analytics":
        return <Analytics />;
      case "Students":
        return <Students />;
      case "AdminSettings":
        return <AdminSettings />;
      case "Timetable":
        return <Timetable />;
      case "StudentManagement":
        return <StudentManagement />;
      case "MLInsights":
        return <MLInsights />;
      case "Classes":
        return <Classes />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div>
      {/* Simple Menu */}
      <nav className="flex gap-4 p-4 bg-gray-100">
        {["Analytics","Students","AdminSettings","Timetable","StudentManagement","MLInsights","Classes"].map(p => (
          <button key={p} onClick={() => setPage(p)} className="px-3 py-1 border rounded">
            {p}
          </button>
        ))}
      </nav>

      {/* Render selected page */}
      {renderPage()}
    </div>
  );
}

export default App;
