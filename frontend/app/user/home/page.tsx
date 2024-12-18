'use client'
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { UsersIcon } from 'lucide-react';
import { RoundCard } from '@/components/RoundCard';
import { TimelineConnector } from '@/components/TimelineConnector';

export interface Round {
    id: number;
    title: string;
    description: string;
    icon: string;
    status: 'locked' | 'active' | 'completed';
    deadline: string;
  }
const rounds: Round[] = [
  {
    id: 1,
    title: "Round 1: Ideation Phase",
    description: "Submit your innovative idea and initial proposal. Focus on problem identification and solution approach.",
    icon: "rocket",
    status: "completed",
    deadline: "March 15, 2024"
  },
  {
    id: 2,
    title: "Round 2: Development Phase",
    description: "Build your prototype and demonstrate core functionalities. Show us your technical expertise.",
    icon: "bulb",
    status: "active",
    deadline: "March 30, 2024"
  },
  {
    id: 3,
    title: "Round 3: Final Presentation",
    description: "Present your complete solution to our panel of industry experts and compete for the grand prize.",
    icon: "trophy",
    status: "locked",
    deadline: "April 15, 2024"
  }
];

const teamDetails = [
  { name: "John Doe", year: "3rd Year", department: "Computer Science", role: "Team Leader" },
  { name: "Jane Smith", year: "2nd Year", department: "Information Technology" },
  { name: "Emily Johnson", year: "3rd Year", department: "Electronics and Communication" },
  { name: "Michael Brown", year: "4th Year", department: "Mechanical Engineering" },
  { name: "Sarah Davis", year: "3rd Year", department: "Electrical Engineering" }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white w-screen">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover opacity-10" />

      <div className="relative">
        <motion.div
          className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-center mb-24"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Hackfusion 25
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Join our premier hackathon and transform your innovative ideas into reality
            </p>
          </motion.div>

          <motion.div 
            className="text-center mb-12 flex justify-center gap-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-12 py-8 rounded-2xl shadow-lg shadow-purple-500/20"
            >
              <UsersIcon className="mr-3 h-6 w-6" />
              Create Team
            </Button>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-xl px-12 py-8 rounded-2xl shadow-lg shadow-purple-500/20"
            >
              <UsersIcon className="mr-3 h-6 w-6" />
              Join Team
            </Button>
          </motion.div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-6">Team Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamDetails.map((member, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-400">{member.year}</p>
                  <p className="text-gray-400">{member.department}</p>
                  {member.role && (
                    <p className="text-purple-400 font-medium">{member.role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {rounds.map((round, index) => (
              <div key={round.id} className="relative">
                {index < rounds.length - 1 && (
                  <TimelineConnector isCompleted={round.status === 'completed'} />
                )}
                <RoundCard
                  round={round}
                  position={index % 2 === 0 ? 'left' : 'right'}
                />
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default App;
