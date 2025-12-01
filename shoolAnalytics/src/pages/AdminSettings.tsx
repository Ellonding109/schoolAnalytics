import React, { useState } from "react";

// --- Mock Data ---
const mockUsers = [
  { id: 1, name: "John Doe", role: "Teacher", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", role: "Student", email: "jane@example.com", status: "Inactive" },
  { id: 3, name: "Sam Lee", role: "Admin", email: "sam@example.com", status: "Active" },
];

// --- Components ---
function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold rounded-t-lg border-b-2 ${
        active ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

function UserTable({ users }: { users: typeof mockUsers }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-center">Status</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className={`border p-2 text-center font-semibold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                {user.status}
              </td>
              <td className="border p-2 text-center flex justify-center gap-2">
                <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">Edit</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Main Page ---
export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("Users");

  return (
    <div className="p-6 w-full bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Admin Settings</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <Tab label="Users" active={activeTab === "Users"} onClick={() => setActiveTab("Users")} />
        <Tab label="Permissions" active={activeTab === "Permissions"} onClick={() => setActiveTab("Permissions")} />
        <Tab label="System Config" active={activeTab === "System Config"} onClick={() => setActiveTab("System Config")} />
        <Tab label="API Integrations" active={activeTab === "API Integrations"} onClick={() => setActiveTab("API Integrations")} />
      </div>

      {/* Tab Contents */}
      {activeTab === "Users" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-700">User Management</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add New User</button>
          </div>
          <UserTable users={mockUsers} />
        </div>
      )}

      {activeTab === "Permissions" && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Role & Permission Settings</h2>
          <p className="text-gray-500 mb-3">Define roles, permissions, and access levels for teachers, students, and admins.</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="w-36 font-medium text-gray-700">Teacher Access:</label>
              <select className="px-3 py-2 border rounded shadow-sm">
                <option>Full Access</option>
                <option>Limited Access</option>
                <option>No Access</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="w-36 font-medium text-gray-700">Student Access:</label>
              <select className="px-3 py-2 border rounded shadow-sm">
                <option>View Only</option>
                <option>Limited Edit</option>
                <option>No Access</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="w-36 font-medium text-gray-700">Admin Access:</label>
              <select className="px-3 py-2 border rounded shadow-sm">
                <option>Full Control</option>
                <option>Restricted</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === "System Config" && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">System Configuration</h2>
          <p className="text-gray-500 mb-3">Configure system-wide settings such as term dates, notification emails, and timetable rules.</p>
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <label className="w-36 font-medium text-gray-700">Current Term:</label>
              <input type="text" className="px-3 py-2 border rounded shadow-sm" defaultValue="Term 3" />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <label className="w-36 font-medium text-gray-700">School Year:</label>
              <input type="text" className="px-3 py-2 border rounded shadow-sm" defaultValue="2025" />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <label className="w-36 font-medium text-gray-700">Notifications Email:</label>
              <input type="email" className="px-3 py-2 border rounded shadow-sm" defaultValue="admin@school.com" />
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save Settings</button>
        </div>
      )}

      {activeTab === "API Integrations" && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">API & External Integrations</h2>
          <p className="text-gray-500 mb-3">Connect external systems such as the school database, payment gateways, and timetable generator.</p>
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <label className="w-36 font-medium text-gray-700">School DB API Key:</label>
              <input type="text" className="px-3 py-2 border rounded shadow-sm" defaultValue="************" />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <label className="w-36 font-medium text-gray-700">Payment Gateway:</label>
              <select className="px-3 py-2 border rounded shadow-sm">
                <option>Paystack</option>
                <option>M-Pesa</option>
                <option>Flutterwave</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <label className="w-36 font-medium text-gray-700">Timetable API:</label>
              <input type="text" className="px-3 py-2 border rounded shadow-sm" defaultValue="https://api.school.com/timetable" />
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save Integrations</button>
        </div>
      )}
    </div>
  );
}
