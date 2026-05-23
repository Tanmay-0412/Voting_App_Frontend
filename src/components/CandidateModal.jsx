import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const CandidateModal = ({ isOpen, onClose, candidate, onSuccess }) => {
  const [formData, setFormData] = useState({
    candidateName: "",
    party: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (candidate) {
      setFormData({
        candidateName: candidate.candidateName || "",
        party: candidate.party || "",
        age: candidate.age || "",
      });
    } else {
      setFormData({
        candidateName: "",
        party: "",
        age: "",
      });
    }
    setError("");
  }, [candidate, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.candidateName.trim()) {
      setError("Candidate name is required");
      return false;
    }
    if (!formData.party.trim()) {
      setError("Party name is required");
      return false;
    }
    if (!formData.age || isNaN(formData.age) || formData.age < 18) {
      setError("Age must be a number and at least 18");
      return false;
    }
    // if (!formData.image.trim()) {
    //   setError("Image URL is required");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        candidateName: formData.candidateName,
        party: formData.party,
        age: parseInt(formData.age),
        image: formData.image,
      };

      let URL, method;

      if (candidate?._id) {
        // Edit candidate
        URL = `${BASE_URL}/candidate/update/${candidate._id}`;
        method = "PATCH";
      } else {
        // Add candidate
        URL = `${BASE_URL}/candidate/add`;
        method = "POST";
      }

      const response = await fetch(URL, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`${data.message}`, {
            position: "top-right",
            theme: "colored",
        });
        onSuccess();
        onClose();
      } else {
        setError(data.message || "Failed to save candidate");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error("Error saving candidate:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-200 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {candidate ? "Edit Candidate" : "Add Candidate"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Candidate Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Candidate Name *
            </label>
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              placeholder="Enter candidate name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={loading}
            />
          </div>

          {/* Party */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Party *
            </label>
            <input
              type="text"
              name="party"
              value={formData.party}
              onChange={handleChange}
              placeholder="Enter party name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={loading}
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              min="18"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={loading}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={loading}
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Preview
              </p>
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x400?text=Invalid+Image";
                }}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : candidate
                  ? "Update Candidate"
                  : "Add Candidate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateModal;
