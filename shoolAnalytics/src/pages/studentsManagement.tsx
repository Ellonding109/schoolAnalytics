import React, { useState, useMemo } from "react";
import { CSVLink } from "react-csv";

// --- Mock Data ---
const mockStudents = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  firstName: `Student${i + 1}`,
  lastName: `Last${i + 1}`,
  regNo: `REG${1000 + i}`,
  dob: `200${i % 10}-0${(i % 9) + 1}-15`,
  gender: i % 2 === 0 ? "Male" : "Female",
  class: `Class ${(i % 5) + 1}`,
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

// --- Students Table Component ---
function StudentsTable({ students }: { students: typeof mockStudents }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof typeof students[0] | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredStudents = useMemo(() => {
    let filtered = students.filter(
      (s) =>
        s.firstName.toLowerCase().includes(search.toLowerCase()) ||
        s.lastName.toLowerCase().includes(search.toLowerCase()) ||
        s.regNo.toLowerCase().includes(search.toLowerCase())
    );

    if (sortKey) {
      filtered.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [search, sortKey, sortOrder, students]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const currentData = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key: keyof typeof students[0]) => {
    if (sortKey === key) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by name or reg no..."
          className="px-3 py-2 border rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CSVLink
          data={filteredStudents}
          filename={"students_export.csv"}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
        >
          Export CSV
        </CSVLink>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {["First Name", "Last Name", "Reg No", "DOB", "Gender", "Class", "Status"].map((header, idx) => (
                <th
                  key={idx}
                  className="border p-2 text-left cursor-pointer select-none"
                  onClick={() => handleSort(header.replace(" ", "").toLowerCase() as keyof typeof students[0])}
                >
                  {header} {sortKey === header.replace(" ", "").toLowerCase() ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="border p-2">{s.firstName}</td>
                <td className="border p-2">{s.lastName}</td>
                <td className="border p-2">{s.regNo}</td>
                <td className="border p-2">{s.dob}</td>
                <td className="border p-2">{s.gender}</td>
                <td className="border p-2">{s.class}</td>
                <td className={`border p-2 text-center font-semibold ${s.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {s.status}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// --- Main Admin Students Page ---
export default function AdminStudentsPage() {
  return (
    <div className="p-6 w-full min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Students Management</h1>
      <StudentsTable students={mockStudents} />
    </div>
  );
}
