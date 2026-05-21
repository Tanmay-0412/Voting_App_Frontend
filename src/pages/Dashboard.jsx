import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BASE_URL } from "../../config";

const Dashboard = () => {

  // =========================
  // Dummy Data
  // =========================

  const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Sarah" },
  { id: 3, name: "Michael" },
  { id: 4, name: "Emma" },
  { id: 5, name: "David" },
  { id: 6, name: "Chris" },
  { id: 7, name: "Olivia" },
  { id: 8, name: "Daniel" },
  { id: 9, name: "Sophia" },
  { id: 10, name: "James" },
];

const candidates = [
  {
    id: 1,
    name: "John Carter",
    votes: 4,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    votes: 3,
  },
  {
    id: 3,
    name: "Michael Lee",
    votes: 2,
  },
  {
    id: 4,
    name: "Emma Brown",
    votes: 1,
  },
];


  // =========================
  // Calculations
  // =========================

  const totalVotes = candidates.reduce(
    (sum, item) => sum + item.votes,
    0
  );

  const leadingCandidate = candidates.reduce((prev, current) =>
    prev.votes > current.votes ? prev : current
  );

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Voting Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          View live voting statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">
            Total Users
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {users.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">
            Total Candidates
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {candidates.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">
            Total Votes
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {totalVotes}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">
            Leading Candidate
          </p>

          <h2 className="text-xl font-bold text-purple-600 mt-2">
            {leadingCandidate.name}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Live Voting Count
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={candidates}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="votes"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Vote Share
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={candidates}
                dataKey="votes"
                nameKey="name"
                outerRadius={120}
                label
              >
                {candidates.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;