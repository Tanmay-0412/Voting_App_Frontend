import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    usersCount: 0,
    totalVotes: 0,
    candidateVotes: [],
    leadingCandidate: {}
  })

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
  ];
  const dashboardDetails = async() =>{
    try{
      const URL = `${BASE_URL}/dashboard`
      const data = await fetch(URL, {
          method:"GET",
          credentials:'include'
      })
      const response = await data.json()
      setDashboardData(response)
    }catch(err){
      console.error(err.message)
    }
  }

  useEffect(()=>{
    dashboardDetails()
  },[])

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
            {dashboardData.usersCount}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">
            Total Candidates
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {dashboardData.candidateVotes?.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">
            Total Votes
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {dashboardData.totalVotes}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">
            Leading Candidate
          </p>

          <h2 className="text-xl font-bold text-purple-600 mt-2">
            {dashboardData.leadingCandidate?.name || "N/A"}
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
            <BarChart data={dashboardData.candidateVotes?.map(candidate => ({
              name: candidate.name,
              votes: candidate.votesCount
            }))}>
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
                data={dashboardData.candidateVotes?.map(candidate => ({
                  name: candidate.name,
                  votes: candidate.votesCount
                }))}
                dataKey="votes"
                nameKey="name"
                outerRadius={120}
                label
              >
                {dashboardData.candidateVotes?.map((entry, index) => (
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