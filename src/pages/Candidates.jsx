import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Vote,
} from "lucide-react";

const Candidates = ({ role = "admin" }) => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "John Carter",
      party: "Democratic Party",
      votes: 420,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      party: "Republic Party",
      votes: 310,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    },
    {
      id: 3,
      name: "Michael Lee",
      party: "Independent",
      votes: 210,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
    },
  ]);

  const handleDelete = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  const handleVote = (id) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      )
    );
  };

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Candidates
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage election candidates here.
          </p>
        </div>

        {role === "admin" && (
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200">
            <Plus size={18} />
            Add Candidate
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate) => {
          const percentage = (
            (candidate.votes / totalVotes) *
            100
          ).toFixed(1);

          return (
            <div
              key={candidate.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {candidate.name}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  {candidate.party}
                </p>

                {/* Admin View */}
                {role === "admin" ? (
                  <>
                    {/* Vote Count */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        Votes
                      </span>

                      <span className="font-semibold text-blue-600">
                        {candidate.votes}
                      </span>
                    </div>

                    {/* Graph */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 py-2 rounded-lg transition-all duration-200">
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(candidate.id)
                        }
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 py-2 rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  /* User View */
                  <button
                    onClick={() => handleVote(candidate.id)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200"
                  >
                    <Vote size={18} />
                    Vote Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Candidates;