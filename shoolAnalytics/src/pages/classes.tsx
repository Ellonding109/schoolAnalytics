// src/pages/ClassesPage.tsx

import React from "react";

import { PlusCircle, Building2, Users, MoreVertical, Search } from "lucide-react";

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Classes Management</h1>

        <button className="mt-3 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition-all">
          <PlusCircle size={18} /> Add Class
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Building2 className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Classes</p>
            <h3 className="text-2xl font-semibold text-gray-800">32</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <Users className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Average Students</p>
            <h3 className="text-2xl font-semibold text-gray-800">42</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <Building2 className="text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Special Streams</p>
            <h3 className="text-2xl font-semibold text-gray-800">4</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Users className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Teachers Assigned</p>
            <h3 className="text-2xl font-semibold text-gray-800">56</h3>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow rounded-2xl p-4 mb-6 flex items-center gap-3 border border-gray-100">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search classes by name, stream, or teacher..."
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* Classes Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Class Name</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Stream</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Students</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Class Teacher</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1,2,3,4,5,6].map((i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 px-6 font-medium text-gray-800">Form {i}</td>
                <td className="py-4 px-6 text-gray-600">Stream {String.fromCharCode(64 + i)}</td>
                <td className="py-4 px-6 text-gray-600">{35 + i}</td>
                <td className="py-4 px-6 text-gray-600">Mr. Teacher {i}</td>
                <td className="py-4 px-6 text-right">
                  <button className="p-2 hover:bg-gray-200 rounded-xl transition">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
