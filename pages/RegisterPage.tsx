"use client";
import { useState } from "react";
import { Plus, Trash2, Users, UserPlus, Home, CheckCircle } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamLeader, setTeamLeader] = useState({
    name: "",
    regNo: "",
    dept: "",
    year: "",
    email: "",
    phoneno: "",
  });

  const [members, setMembers] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false); // Success Message State

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setTeamLeader((prev) => ({ ...prev, [name]: value }));
  };

  const addMember = () => {
    if (members.length < 3) {
      setMembers([
        ...members,
        { name: "", regNo: "", dept: "", year: "", email: "", phoneno: "" },
      ]);
    } else {
      alert("Maximum 3 team members allowed");
    }
  };

  const updateMember = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...members];
    updatedMembers[index][name] = value;
    setMembers(updatedMembers);
  };

  const removeMember = (indexToRemove) => {
    setMembers(members.filter((_, index) => index !== indexToRemove));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     teamName,
  //     teamDescription,
  //     teamLeader,
  //     members
  //   };

  //   try {
  //     const response = await fetch('http://localhost:6969/api/users/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     if (response.ok) {
  //       setIsRegistered(true); // Show success message
  //     } else {
  //       alert(data.message || 'Registration failed');
  //     }
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     alert('Something went wrong. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!teamName || !teamDescription) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate team leader fields
    const leaderFieldsFilled = Object.values(teamLeader).every(
      (field) => field.trim() !== "",
    );
    if (!leaderFieldsFilled) {
      alert("Please fill in all team leader details");
      return;
    }

    // Validate members fields if any members are added
    const membersValid = members.every((member) =>
      Object.values(member).every((field) => field.trim() !== ""),
    );
    if (members.length > 0 && !membersValid) {
      alert("Please fill in all team member details");
      return;
    }

    // If all validations pass, set registered state
    setIsRegistered(true);
  };

  const renderInputField = (
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    additionalClasses = "",
  ) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        transition duration-200 ease-in-out 
        ${additionalClasses}`}
      required
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Users className="mr-4" size={40} />
            <div>
              <h1 className="text-3xl font-bold">Team Registration</h1>
              <p className="text-blue-100">Create your team for the event</p>
            </div>
          </div>
          <Link
            href="/"
            className="hover:bg-blue-700 p-2 rounded-full transition-all duration-200"
            title="Back to Home"
          >
            <Home size={28} />
          </Link>
        </div>

        {isRegistered ? (
          <div className="p-8 flex flex-col items-center text-center">
            <CheckCircle className="text-green-500" size={50} />
            <h2 className="text-2xl font-bold text-green-600 mt-4">
              Team Registered Successfully!
            </h2>
            <p className="text-gray-700 mt-2">
              Your team has been successfully registered. Check your email for
              further instructions.
            </p>
            <Link
              href="/"
              className="mt-6 text-blue-600 font-semibold hover:underline"
            >
              Go back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Team Name
              </label>
              {renderInputField(
                "teamName",
                teamName,
                (e) => setTeamName(e.target.value),
                "Enter your team name",
                "text",
                "text-lg",
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Abstract
              </label>
              <textarea
                name="teamDescription"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder="Describe your team's goals or project"
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  transition duration-200 ease-in-out min-h-[100px] text-base"
                required
              />
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <UserPlus className="mr-3 text-blue-600" size={28} />
                <h2 className="text-xl font-semibold text-blue-800">
                  Team Leader Details
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {Object.keys(teamLeader).map((field) => (
                  <div key={field}>
                    <label className="block text-gray-600 mb-1 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    {renderInputField(
                      field,
                      teamLeader[field],
                      handleLeaderChange,
                      `Enter ${field}`,
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Users className="mr-3 text-blue-600" size={28} />
                <h2 className="text-xl font-semibold text-blue-800">
                  Team Members
                  <span className="text-sm text-gray-500 ml-2">
                    ({members.length}/3)
                  </span>
                </h2>
              </div>

              {members.map((member, index) => (
                <div
                  key={index}
                  className="relative mb-4 bg-gray-50 p-4 rounded-lg border"
                >
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">
                    Member {index + 1}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.keys(member).map((field) => (
                      <div key={field}>
                        <label className="block text-gray-600 mb-1 capitalize">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        {renderInputField(
                          field,
                          member[field],
                          (e) => updateMember(index, e),
                          `Enter ${field}`,
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-center mt-4">
                {members.length < 3 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="flex items-center px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Plus className="mr-2" size={20} /> Add Member
                  </button>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white 
              font-bold py-3 px-4 rounded-lg transition-all duration-300"
            >
              Register Team
            </button>
          </form>
        )}
      </div>
      <button onClick={signOut}>logout</button>
    </div>
  );
}
