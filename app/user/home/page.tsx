'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Copy, LogOut } from 'lucide-react';
import { RoundCard } from '@/components/RoundCard';
import { TimelineConnector } from '@/components/TimelineConnector';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { CreateTeamDialog } from '@/components/CreateTeamDialog';
import { JoinTeamDialog } from '@/components/joinTeamDialog';
import { DeleteTeamDialog } from '@/components/DeleteTeamDialog';
import { LeaveTeamDialog } from '@/components/LeaveTeamDialog';
import { Spinner } from '@/components/Spinner';

export interface Round {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'locked' | 'active' | 'completed' ;
  deadline: string;
}

const rounds: Round[] = [
  {
    id: 1,
    title: "Round 1: Ideation Phase",
    description: "Submit your innovative idea and initial proposal. Focus on problem identification and solution approach.",
    icon: "rocket",
    status: "locked",
    deadline: "March 15, 2024"
  },
  {
    id: 2,
    title: "Round 2: Development Phase",
    description: "Build your prototype and demonstrate core functionalities. Show us your technical expertise.",
    icon: "bulb",
    status: "locked",
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

export interface teamDetailsType {
  name: string;
  year: string;
  dept: string;
  isTeamLead: boolean;
}

function App() {
  const [inTeam, setInTeam] = useState(false);
  const [isTeamLead, setTeamLead] = useState(false);
  const [teamDetails, setTeamDetails] = useState<teamDetailsType[] | undefined>(undefined);
  const [flag, setFlag] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>("");

  const { data, status } = useSession();
  const router = useRouter();

  const getTeam = async () => {
    try {
      const res = await axios.get("/api/users/isinateam", {
        headers: { email: data?.user?.email }
      });

      if (res.data.success) {
        setInTeam(true);
        if (res.data.teamdetails) {
          if (res.data.isTeamLead) {
            rounds[0].status = "active"
          }
          if(res.data.teamdetails.team.teamSubmisison){
            rounds[0].status = 'completed';
          }
          setTeamId(res.data.teamdetails.team.id);
          setTeamLead(res.data.isTeamLead);
          setTeamDetails(res.data.teamdetails.team.members);
        }
      }
      setFlag(true);
    } catch (error) {
      setFlag(true)
      console.error(error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(teamId)
    }

     catch (error) {
      console.error("Failed to copy team ID", error);
    }
 
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      alert("Login First");
      router.push("/");
    } else if (status === 'authenticated') {
      getTeam();
    }
  }, [status, flag]);

  if (status === "loading" || !flag) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover opacity-10" />
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-4">
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
          <motion.div
            className="text-center mb-12 sm:mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hackfusion 25
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Join our premier hackathon and transform your innovative ideas into reality
            </motion.p>
          </motion.div>

          <motion.div
            className="text-center mb-12 flex justify-center gap-4 sm:gap-6 flex-wrap"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {!inTeam ? (
              <>
                <CreateTeamDialog email={data?.user?.email || " "} setFlag={setFlag} />
                <JoinTeamDialog email={data?.user?.email || ""} setflag={setFlag} />
              </>
            ) : (
              <div className="text-center mb-16 ">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">Team Details</h2>
                <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Team ID</h3>
                  <div className='flex justify-evenly items-center gap-2 w-full'>
                    <p className='text-white break-all'>{teamId}</p>
                    <Button size="icon" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-4">
                  {teamDetails?.map((member, index) => (
                    <div key={index} className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{member.name}</h3>
                      <p>{member.year} - {member.dept}</p>
                      {member.isTeamLead && <p className="text-green-500 mt-2">Team Lead</p>}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  {isTeamLead ? (
                    <DeleteTeamDialog email={data?.user?.email || ""} setFlag={setFlag} />
                  ) : (
                    <LeaveTeamDialog email={data?.user?.email || ""} setFlag={setFlag} />
                  )}
                </div>
              </div>
            )}
          </motion.div>
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
        </div>
      </div>
    </div>
  );
}

export default App;


