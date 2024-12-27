"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type Member = {
  id: string;
  name: string;
  email: string;
};

type Problem = {
  theme: string;
};

type TeamSubmission = {
  solutionTitle: string;
  description: string;
  problem?: Problem;
};

type Team = {
  id: string;
  name: string;
  members: Member[];
  status: "pending" | "approved" | "rejected";
  teamSubmisison?: TeamSubmission;
};

export default function AdminPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "pending" | "approved" | "rejected"
  >("pending");
  const [selectedTheme, setSelectedTheme] = useState<string>(""); // Theme filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get<{ teams: Team[] }>(
          "/api/admin/getteams",
        );
        setTeams(response.data.teams);
      } catch (error) {
        setError("Error fetching Teams");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleSelectTeam = (teamId: string) => {
    const updatedSelection = new Set(selectedTeams);
    if (updatedSelection.has(teamId)) {
      updatedSelection.delete(teamId);
    } else {
      updatedSelection.add(teamId);
    }
    setSelectedTeams(updatedSelection);
  };

  const handleAction = async (status: "approved" | "rejected") => {
    setActionLoading(true);
    try {
      const selectedTeamArray = Array.from(selectedTeams);
      await axios.post("/api/admin/updateTeamsStatus", {
        teamIds: selectedTeamArray,
        status,
      });

      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          selectedTeams.has(team.id) ? { ...team, status } : team,
        ),
      );

      alert(`Teams ${status} successfully!`);
      setSelectedTeams(new Set());
    } catch (error) {
      alert(`Failed to ${status} selected teams.`);
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleApprove = async () => {
    await handleAction("approved");
  };

  const handleReject = async () => {
    await handleAction("rejected");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const filteredTeams = teams.filter(
    (team) =>
      team.status === selectedTab &&
      (!selectedTheme || team.teamSubmisison?.problem?.theme === selectedTheme),
  );

  const uniqueThemes = Array.from(
    new Set(
      teams.map((team) => team.teamSubmisison?.problem?.theme).filter(Boolean),
    ),
  ) as string[];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      {/* Tabs */}
      <div className="flex mb-6">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab as typeof selectedTab)}
            className={`px-4 py-2 border-b-2 ${
              selectedTab === tab
                ? tab === "approved"
                  ? "border-green-500 text-green-500"
                  : tab === "rejected"
                    ? "border-red-500 text-red-500"
                    : "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Theme Filter */}
      <div className="mb-6">
        <label className="font-medium text-gray-700">Filter by Theme:</label>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="ml-2 px-4 py-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Themes</option>
          {uniqueThemes.map((theme, index) => (
            <option key={index} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      {/* Team List */}
      {filteredTeams.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className={`$ {
                selectedTab === "approved"
                  ? "bg-green-200 hover:border-green-800"
                  : selectedTab === "rejected"
                  ? "bg-red-200 hover:border-red-500"
                  : "bg-slate-50 hover:border-blue-800"
              } border-2 p-4 rounded-lg shadow-md shadow-slate-400 hover:shadow-lg hover:shadow-slate-400 transition-shadow flex justify-between items-center`}
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
                <p className="text-gray-600 font-medium">
                  Theme: {team.teamSubmisison?.problem?.theme || "N/A"}
                </p>
                <div className="mb-2">
                  <p className="text-gray-600 font-medium">Members:</p>
                  <ol className="list-disc list-inside ml-4">
                    {team.members.map((member) => (
                      <li key={member.id} className="text-gray-700">
                        {member.name} ({member.email})
                      </li>
                    ))}
                  </ol>
                </div>
                {team.teamSubmisison && (
                  <div className="mt-4">
                    <p className="text-gray-600 font-medium">Submission:</p>
                    <p className="text-gray-700">
                      <strong>Title:</strong>{" "}
                      {team.teamSubmisison.solutionTitle}
                    </p>
                    <p className="text-gray-700">
                      <strong>Description:</strong>{" "}
                      {team.teamSubmisison.description}
                    </p>
                  </div>
                )}
              </div>
              <input
                type="checkbox"
                className="w-6 h-6"
                checked={selectedTeams.has(team.id)}
                onChange={() => handleSelectTeam(team.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No teams found in this category.</p>
      )}

      {/* Approve & Reject Buttons */}
      <div className="flex gap-4 mt-6">
        {(selectedTab === "pending" || selectedTab === "rejected") && (
          <button
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 disabled:opacity-50"
            onClick={handleApprove}
            disabled={actionLoading || selectedTeams.size === 0}
          >
            {actionLoading && selectedTeams.size > 0
              ? "Processing..."
              : "Approve Selected Teams"}
          </button>
        )}
        {(selectedTab === "pending" || selectedTab === "approved") && (
          <button
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 disabled:opacity-50"
            onClick={handleReject}
            disabled={actionLoading || selectedTeams.size === 0}
          >
            {actionLoading && selectedTeams.size > 0
              ? "Processing..."
              : "Reject Selected Teams"}
          </button>
        )}
      </div>
    </div>
  );
}
