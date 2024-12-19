"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());
    const [approveLoading, setApproveLoading] = useState(false);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [themes, setThemes] = useState<string[]>([]);
    const [selectedTheme, setSelectedTheme] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                // Using axios to fetch data
                const response = await axios.get("/api/admin/getteams");
                console.log("Response:", response.data);

                // Assuming the response contains a "teams" key
                const teamsData = response.data.teams;
                setTeams(teamsData);
                setFilteredTeams(teamsData);

                // Extract unique themes from the teams
                const uniqueThemes = Array.from(
                    new Set(
                        teamsData.map((team: any) =>
                            team.teamSubmisison?.problem?.theme || "No Theme"
                        )
                    )
                );
                setThemes(uniqueThemes);
            } catch (err) {
                // Extracting and setting error message
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const theme = e.target.value;
        setSelectedTheme(theme);

        if (theme === "All") {
            setFilteredTeams(teams);
        } else {
            const filtered = teams.filter(
                (team: any) =>
                    team.teamSubmisison?.problem?.theme === theme
            );
            setFilteredTeams(filtered);
        }
    };

    const handleSelectTeam = (teamId: string) => {
        const updatedSelection = new Set(selectedTeams);
        if (updatedSelection.has(teamId)) {
            updatedSelection.delete(teamId);
        } else {
            updatedSelection.add(teamId);
        }
        setSelectedTeams(updatedSelection);
    };

    const handleApprove = async () => {
        setApproveLoading(true);
        try {
            const selectedTeamArray = Array.from(selectedTeams);
            console.log(selectedTeamArray);
            await axios.post("/api/admin/addSelectedTeams", { teamIds:selectedTeamArray })
            alert("Teams approved successfully!");
            setSelectedTeams(new Set());
        } catch (err) {
            alert(
                err.response?.data?.message || "Failed to approve selected teams."
            );
        } finally {
            setApproveLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

            {/* Theme Filter */}
            <div className="mb-4">
                <label htmlFor="themeFilter" className="block text-gray-700 font-medium mb-2">
                    Filter by Theme
                </label>
                <select
                    id="themeFilter"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    value={selectedTheme}
                    onChange={handleThemeChange}
                >
                    <option value="All">All</option>
                    {themes.map((theme) => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
            </div>

            {filteredTeams.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {filteredTeams.map((team: any) => (
                        <div
                            key={team.id}
                            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
                                <div className="mb-2">
                                    <p className="text-gray-600 font-medium">Members:</p>
                                    <ol type="1" className="list-disc list-inside ml-4">
                                        {team.members.map((member: any) => (
                                            <li key={member.id} className="text-gray-700">
                                                {member.name} ({member.email})
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                {team.teamSubmisison && (
                                    <div className="mt-4">
                                        <p className="text-gray-600 font-medium">
                                            Submission:
                                        </p>
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
                <p>No teams found.</p>
            )}

            <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 disabled:opacity-50"
                onClick={handleApprove}
                disabled={approveLoading || selectedTeams.size === 0}
            >
                {approveLoading ? "Approving..." : "Approve Selected Teams"}
            </button>
        </div>
    );
}