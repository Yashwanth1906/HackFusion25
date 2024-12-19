'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface teamDetailsType {
  name: string;
  year: string;
  dept: string;
  isTeamLead: boolean;
}


function RoundSubmissionPage() {
  const [teamDetails, setTeamDetails] = useState<teamDetailsType[] | undefined>(undefined);
  const [teamName, setTeamName] = useState('');
  const [formData, setFormData] = useState({
    problemId: '',
    solutionTitle: '',
    description: '',
  });
  const [flag,setFlag]=useState<boolean>(false)

  const { data: session ,status} = useSession();
  const router = useRouter();

  const getTeamDetails = async () => {
    try {
      const res = await axios.get("/api/users/isinateam", {
        //@ts-ignore
        headers: { email: session.user.email },
      });

      if (res.status === 200 && res.data.teamdetails) {
        setTeamName(res.data.teamdetails.team.name);
        setTeamDetails(res.data.teamdetails.team.members);
      }
      setFlag(true)
    } catch (error) {
      console.error(error);
      alert("Failed to fetch team details.");
    }
  };
  
  useEffect(() => {
    if (status === "unauthenticated") {
      alert("Login First");
      router.push("/");
    }
    else if(status==='authenticated')
    {
      getTeamDetails()
    }
  }, [status]);

  if (status === "loading"  || !flag) {
    return <div>Loading...</div>;
  }

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/users/submitidea', formData, {
        //@ts-ignore
        headers: { email: session.user.email },
      });

      if (res.data.success) {
        setFormData({ problemId: '', solutionTitle: '', description: '' });
      }
      alert(res.data.message)
    } catch (error) {
      console.error(error);
      alert('Failed to submit. Please try again.');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white w-screen">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover opacity-10" />
      <div className="relative">
        <motion.div
          className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
     
          <motion.div
            className="text-center mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              HackFusion 25
            </h1>
            <h2 className="text-4xl text-gray-300">Round 1 Submission</h2>
          </motion.div>


          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-6">{teamName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamDetails?.map((member, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-400">{member.year}</p>
                  <p className="text-gray-400">{member.dept}</p>
                  {member.isTeamLead && (
                    <p className="text-purple-400 font-medium">Team Lead</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Submit Your Solution</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Problem Statement ID
                </label>
                <input
                  type="text"
                  name="problemId"
                  value={formData.problemId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Solution Title
                </label>
                <input
                  type="text"
                  name="solutionTitle"
                  value={formData.solutionTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Description (200 words max)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={200}
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-6 py-3 rounded-lg shadow-lg shadow-purple-500/20"
              >
                Submit
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RoundSubmissionPage;
