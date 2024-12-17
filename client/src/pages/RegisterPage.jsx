'use client'
import { useState } from "react"

export default function RegisterPage() {
  const [teamName, setTeamName] = useState('');
  const [teamLeader, setTeamLeader] = useState({
    name: '',
    regNo: '',
    dept: '',
    year: '',
    email: '',
    phoneno: '',
  });

  const [members, setMembers] = useState([
    { name: '', regNo: '', dept: '', year: '', email: '', phoneno: '' },
    { name: '', regNo: '', dept: '', year: '', email: '', phoneno: '' },
    { name: '', regNo: '', dept: '', year: '', email: '', phoneno: '' },
  ]);

  const handleTeamLeaderChange = (e) => {
    const { name, value } = e.target;
    setTeamLeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...members];
    updatedMembers[index][name] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamLeaderDetails = { ...teamLeader, isTeamLead: true };
    const memberDetails = members.map((member) => ({
      ...member,
      isTeamLead: false,
    }));

    const payload = {
      name: teamName,
      teamLeaderDetails,
      memberDetails,
    };

    try {
      const response = await fetch('http://localhost:6969/api/users/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Team registered successfully! Team ID: ${data.teamId}`);
      } else {
        console.log(data.error);
        alert('Error while registering team. Please try again.');
      }
    } catch (err) {
      console.log(err);
      alert('Something went wrong. Please check your connection.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        className="p-8 rounded shadow-md w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register Your Team</h1>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="teamName">
            Team Name
          </label>
          <input
            id="teamName"
            name="teamName"
            type="text"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <h2 className="text-lg font-semibold mb-2">Team Leader</h2>
        {['name', 'regNo', 'dept', 'year', 'email', 'phoneno'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block font-medium mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type="text"
              required
              value={teamLeader[field]}
              onChange={handleTeamLeaderChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        ))}

        <h2 className="text-lg font-semibold mb-2">Team Members</h2>
        {members.map((member, index) => (
          <div key={index} className="mb-6 border rounded-lg p-4">
            <h3 className="text-md font-medium mb-2">Member {index + 1}</h3>
            {['name', 'regNo', 'dept', 'year', 'email', 'phoneno'].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block font-medium mb-2" htmlFor={`${field}-${index}`}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={`${field}-${index}`}
                  name={field}
                  type="text"
                  required
                  value={member[field]}
                  onChange={(e) => handleMemberChange(index, e)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Register Team
        </button>
      </form>
    </div>)

}
