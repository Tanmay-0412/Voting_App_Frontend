import React, { useContext, useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Vote,
} from "lucide-react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { AuthContext } from "../utlis/AuthProvider";
import CandidateModal from "../components/CandidateModal";

const Candidates = () => {
  const role = localStorage.getItem('Role')
  const {token, isVoted, setIsVoted} = useContext(AuthContext)
  const [candidates, setCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidateList = async () => {
    try {
      const URL = `${BASE_URL}/candidates/list`;
      const data = await fetch(URL, {
        method: "GET",
        credentials: "include",
      });
      const response = await data.json();
      setCandidates(response.data)
    } catch (err) {
      console.error("Candidate listing error:", err);
    }
  };

  const handleOpenModal = (candidate = null) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleDelete = async(id) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) {
      return;
    }

    try{
      const URL = `${BASE_URL}/candidate/delete/${id}`
      const response = await fetch(URL, {
        method:"DELETE",
        credentials:"include"
      })
      const data = await response.json()
      console.log(response)
      if(response.ok) {
        setCandidates(candidates.filter((candidate) => candidate._id !== id));
        toast.info(`${data.message}`, {
          position: "top-center",
          theme: "light",
        });
      } else {
        alert("Failed to delete candidate");
      }
    }catch(err){
      console.error("Error deleting candidate:", err.message);
      alert("Error deleting candidate");
    }
  };

  const handleModalSuccess = () => {
    candidateList();
  };

  const handleVote = async(id) => {
    try{
      const URL = `${BASE_URL}/cast/vote/${id}`
      const response = await fetch(URL, {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
        },
        credentials:'include'
      })
      
      const data = await response.json()
      console.log(data)

      if(response.ok) {
        // Update voting status
        setIsVoted(true)
        
        // Update candidate vote count
        setCandidates((prev) =>
          prev.map((candidate) =>
            candidate._id === id
              ? { ...candidate, voteCount: candidate.voteCount + 1 }
              : candidate
          )
        );

        toast.success("Vote cast successfully!", {
          position: "top-center",
          theme: "light",
        });
      } else {
        toast.error(data.message || "Failed to cast vote", {
          position: "top-center",
          theme: "light",
        });
      }
    }catch(err){
      console.error("Vote error:", err)
      toast.error("Error casting vote", {
        position: "top-center",
        theme: "light",
      });
    }
  };

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.voteCount,
    0
  );

  useEffect(()=>{
      candidateList()
      
      // Fetch user's voting status from profile
      fetchUserVotingStatus()
  }, [])

  const fetchUserVotingStatus = async () => {
    try {
      const URL = `${BASE_URL}/profile/view`;
      const response = await fetch(URL, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      
      // Assuming backend returns isVoted in user profile
      if (data.data && typeof data.data.isVoted !== 'undefined') {
        setIsVoted(data.data.isVoted);
      }
    } catch (err) {
      console.error("Error fetching user voting status:", err);
    }
  };

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
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200">
            <Plus size={18} />
            Add Candidate
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate) => {
          const percentage = (
            (candidate.votes.length / totalVotes) *
            100
          ).toFixed(1);

          return (
            <div
              key={candidate._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={candidate.image}
                  alt={candidate.candidateName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {candidate.candidateName}
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
                        {candidate.voteCount}
                      </span>
                    </div>

                    {/* Graph */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Voters List */}
                    {candidate.votes && candidate.votes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Voters ({candidate.votes.length})
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                          {candidate.votes.map((voter, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-blue-600">•</span>
                              {voter.user?.username || "Anonymous"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button 
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 py-2 rounded-lg transition-all duration-200"
                        onClick={() => handleOpenModal(candidate)}>
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(candidate._id)
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
                    onClick={() => handleVote(candidate._id)}
                    disabled={isVoted}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-200 ${
                      isVoted
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-60"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <Vote size={18} />
                    {isVoted ? "Already Voted" : "Vote Now"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Modal */}
      <CandidateModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        candidate={selectedCandidate}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default Candidates;