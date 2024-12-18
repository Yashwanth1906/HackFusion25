"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                // Using axios to fetch data
                const response = await axios.get("/api/admin/getteams");

                // Assuming the response contains a "teams" key
                setTeams(response.data.teams);
            } catch (err) {
                // Extracting and setting error message
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
            {teams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teams.map((team: any) => (
                        <div
                            key={team.id}
                            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
                            <div className="mb-2">
                                <p className="text-gray-600 font-medium">Members:</p>
                                <ul className="list-disc list-inside ml-4">
                                    {team.members.map((member: any) => (
                                        <li key={member.id} className="text-gray-700">
                                            {member.name} ({member.email})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {team.teamSubmission && (
                                <div className="mt-4">
                                    <p className="text-gray-600 font-medium">
                                        Submission:
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Title:</strong> {team.teamSubmission.solutionTitle}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Description:</strong> {team.teamSubmission.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}                </div>
            ) : (
                <p>No teams found.</p>
            )}
        </div>
    );
}