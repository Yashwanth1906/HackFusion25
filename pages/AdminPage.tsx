"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Crown, Search, UserSearch, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type Member = {
  id: string;
  name: string;
  email: string;
  isTeamLead?: boolean;
};

type Domain = {
  name: string;
};

type TeamSubmission = {
  solutionTitle: string;
  description: string;
  domain?: Domain;
};

type Team = {
  id: string;
  name: string;
  members: Member[];
  status: "pending" | "approved" | "rejected";
  teamSubmisison?: TeamSubmission;
};

const LeaderIcon = () => (
  <Crown size={20} className="inline-block text-yellow-500 mr-1" />
);

const StatusBadge = ({ status }: { status: Team["status"] }) => {
  const statusStyles = {
    pending: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <Badge className={`${statusStyles[status]} capitalize`}>{status}</Badge>
  );
};

export default function AdminPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "pending" | "approved" | "rejected"
  >("pending");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"team" | "member">("team");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get<{ teams: Team[] }>(
          "/api/admin/getteams",
        );
        // Only keep teams with submissions
        const teamsWithSubmissions = response.data.teams.filter(
          (team) => team.teamSubmisison,
        );
        setTeams(teamsWithSubmissions);
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
      const response = await axios.post("/api/admin/updateTeamStatus", {
        teamIds: selectedTeamArray,
        status,
      });

      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          selectedTeams.has(team.id) ? { ...team, status } : team,
        ),
      );

      setSelectedTeams(new Set());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          `Failed to ${status} teams: ${error.response?.data?.message || "Unknown error"}`,
        );
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const filteredTeams = teams.filter((team) => {
    const matchesTab = team.status === selectedTab;
    const matchesTheme =
      !selectedTheme || team.teamSubmisison?.domain?.name === selectedTheme;

    if (!searchQuery) return matchesTab && matchesTheme;

    const query = searchQuery.toLowerCase();

    if (searchType === "team") {
      return (
        matchesTab && matchesTheme && team.name.toLowerCase().includes(query)
      );
    } else {
      return (
        matchesTab &&
        matchesTheme &&
        team.members.some((member) => member.name.toLowerCase().includes(query))
      );
    }
  });

  const uniqueThemes = Array.from(
    new Set(
      teams.map((team) => team.teamSubmisison?.domain?.name).filter(Boolean),
    ),
  ) as string[];

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Round One</h1>
          <div className="flex items-center gap-4">
            <StatusBadge status={selectedTab} />
            <div className="text-sm text-gray-500">
              {filteredTeams.length} submissions found
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder={`Search by ${searchType === "team" ? "team name" : "member name"}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={() =>
                  setSearchType(searchType === "team" ? "member" : "team")
                }
                className="p-2 rounded-md hover:bg-gray-100"
                title={`Switch to ${searchType === "team" ? "member" : "team"} search`}
              >
                {searchType === "team" ? (
                  <Users size={20} />
                ) : (
                  <UserSearch size={20} />
                )}
              </button>
            </div>

            {/* Theme Filter */}
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Themes</option>
              {uniqueThemes.map((theme, index) => (
                <option key={index} value={theme}>
                  {theme}
                </option>
              ))}
            </select>

            {/* Status Tabs */}
            <div className="flex gap-2">
              {["pending", "approved", "rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab as typeof selectedTab)}
                  className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                    selectedTab === tab
                      ? `bg-${tab === "approved" ? "green" : tab === "rejected" ? "red" : "blue"}-100 text-${tab === "approved" ? "green" : tab === "rejected" ? "red" : "blue"}-800`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team List */}
        <div className="space-y-4">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <Card key={team.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{team.name}</h2>
                    <Badge variant="outline">
                      {team.teamSubmisison?.domain?.name}
                    </Badge>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 focus:ring-blue-500"
                    checked={selectedTeams.has(team.id)}
                    onChange={() => handleSelectTeam(team.id)}
                  />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">
                        Team Members
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {team.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-2"
                          >
                            {member.isTeamLead && <LeaderIcon />}
                            <span>{member.name}</span>
                            <span className="text-gray-500 text-sm">
                              ({member.email})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">
                        Project Details
                      </h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium">
                          {team.teamSubmisison?.solutionTitle}
                        </p>
                        <p className="text-gray-600 mt-1">
                          {team.teamSubmisison?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-lg">
              <p className="text-gray-500">
                No submissions found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {selectedTeams.size > 0 && (
          <div className="fixed bottom-6 right-6 flex gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="text-sm text-gray-500 mr-2 self-center">
              {selectedTeams.size} submission(s) selected
            </div>
            {(selectedTab === "pending" || selectedTab === "rejected") && (
              <button
                className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors"
                onClick={() => handleAction("approved")}
                disabled={actionLoading}
              >
                {actionLoading ? "Processing..." : "Approve Selected"}
              </button>
            )}
            {(selectedTab === "pending" || selectedTab === "approved") && (
              <button
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 disabled:opacity-50 transition-colors"
                onClick={() => handleAction("rejected")}
                disabled={actionLoading}
              >
                {actionLoading ? "Processing..." : "Reject Selected"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
