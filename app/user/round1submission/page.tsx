// 'use client';

// import { motion } from 'framer-motion';
// import { Button } from "@/components/ui/button";
// import { useSession } from 'next-auth/react';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Spinner } from '@/components/Spinner';

// export interface teamDetailsType {
//   name: string;
//   year: string;
//   dept: string;
//   isTeamLead: boolean;
// }

// const Themes = ["Med-Tech", "Fin-Tech", "Cyber Security", "Generative AI"];

// function RoundSubmissionPage() {
//   const [teamDetails, setTeamDetails] = useState<teamDetailsType[] | undefined>(undefined);
//   const [teamName, setTeamName] = useState('');
//   const [selectedTheme, setSelectedTheme] = useState<string>('');
//   const [problems, setProblems] = useState<{ sno: string, title: string }[]>([]);
//   const [formData, setFormData] = useState({
//     problemId: '',
//     solutionTitle: '',
//     description: '',
//   });
//   const [flag, setFlag] = useState<boolean>(false);
//   const [isSubmissionDisabled, setIsSubmissionDisabled] = useState(false); // Disable edit flag
//   const [submissionExists, setSubmissionExists] = useState(false); // Flag to track if submission exists

//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const getTeamDetails = async () => {
//     try {
//       const res = await axios.get("/api/users/isinateam", {
//         headers: { email: session?.user?.email },
//       });

//       if (res.status === 200 && res.data.teamdetails) {
//         if(res.data.teamdetails.team.teamSubmisison){
//           setFormData({
//             problemId: res.data.teamdetails.team.teamSubmisison.problem.sno,
//             solutionTitle: res.data.teamdetails.team.teamSubmisison.solutionTitle,
//             description: res.data.teamdetails.team.teamSubmisison.description,
//           });
//           setProblems([{sno:res.data.teamdetails.team.teamSubmisison.problem.sno,title: res.data.teamdetails.team.teamSubmisison.problem.title}])
//           console.log(res.data.teamdetails.team.teamSubmisison.problem.theme)
//           setSelectedTheme(res.data.teamdetails.team.teamSubmisison.problem.theme)
//         }
//         setTeamName(res.data.teamdetails.team.name);
//         setTeamDetails(res.data.teamdetails.team.members);

//       }
//       setFlag(true);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to fetch team details.");
//     }
//   };

//   const getProblemsForTheme = async (theme: string) => {
//     try {
//       const res = await axios.post('/api/users/getps', {
//         theme: theme
//       });
//       if (res.status === 200 && res.data.ps) {
//         setProblems(res.data.ps);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to fetch problems.");
//     }
//   };

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       alert("Login First");
//       router.push("/");
//     } else if (status === 'authenticated') {
//       getTeamDetails();
//     }
//   }, [status]);

//   const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedTheme(e.target.value);
//     getProblemsForTheme(e.target.value); // Fetch problems based on selected theme
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('/api/users/submitidea', formData, {
//         headers: { email: session?.user?.email },
//       });

//       if (res.data.success) {
//         setFormData({ problemId: '', solutionTitle: '', description: '' });
//       }
//       alert(res.data.message);
//     } catch (error) {
//       console.error(error);
//       alert('Failed to submit. Please try again.');
//     }
//   };

//   const handleUpdateSubmission = async () => {
//     try {
//       const res = await axios.post('/api/admin/updatePS', formData, {
//         headers: { email: session?.user?.email },
//       });

//       if (res.data.success) {
//         alert('Submission updated successfully');
//         setIsSubmissionDisabled(true); // Disable fields after update
//         setSubmissionExists(true);
//       } else {
//         alert('Failed to update submission');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Failed to update submission');
//     }
//   };

//   if (status === "loading" || !flag) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white w-screen">
//       <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover opacity-10" />
//       <div className="relative">
//         <motion.div
//           className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <motion.div
//             className="text-center mb-12"
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
//               HackFusion 25
//             </h1>
//             <h2 className="text-4xl text-gray-300">Round 1 Submission</h2>
//           </motion.div>

//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-semibold mb-6">{teamName}</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {teamDetails?.map((member, index) => (
//                 <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
//                   <h3 className="text-xl font-bold mb-2">{member.name}</h3>
//                   <p className="text-gray-400">{member.year}</p>
//                   <p className="text-gray-400">{member.dept}</p>
//                   {member.isTeamLead && (
//                     <p className="text-purple-400 font-medium">Team Lead</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
//             <h2 className="text-3xl font-bold mb-6">{submissionExists ? "Update Your Submission" : "Submit Your Solution"}</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-300 text-sm font-medium mb-2">
//                   Select Theme
//                 </label>
//                 <select
//                   name="theme"
//                   value={selectedTheme}
//                   onChange={handleThemeChange}
//                   className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
//                   disabled={isSubmissionDisabled}
//                   required
//                 >
//                   <option value="">Select a theme</option>
//                   {Themes.map((theme, index) => (
//                     <option key={index} value={theme}>{theme}</option>
//                   ))}
//                 </select>
//               </div>

//               {selectedTheme && (
//                 <div className="mb-4">
//                   <label className="block text-gray-300 text-sm font-medium mb-2">
//                     Select Problem Statement
//                   </label>
//                   <select
//                     name="problemId"
//                     value={formData.problemId}
//                     //@ts-expect-errorthemeChangeError
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
//                     disabled={isSubmissionDisabled}
//                     required
//                   >
//                     <option value="">Select a problem</option>
//                     {problems.map((problem, index) => (
//                       <option key={index} value={problem.sno}>
//                         {problem.sno}: {problem.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               <div className="mb-4">
//                 <label className="block text-gray-300 text-sm font-medium mb-2">
//                   Solution Title
//                 </label>
//                 <input
//                   type="text"
//                   name="solutionTitle"
//                   value={formData.solutionTitle}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
//                   disabled={isSubmissionDisabled}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-300 text-sm font-medium mb-2">
//                   Description (200 words max)
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows={5}
//                   className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
//                   maxLength={200}
//                   disabled={isSubmissionDisabled}
//                   required
//                 />
//               </div>

//               {submissionExists ? (
//                 <Button
//                   type="button"
//                   onClick={handleUpdateSubmission}
//                   size="lg"
//                   className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-6 py-3 rounded-lg shadow-lg shadow-purple-500/20"
//                 >
//                   Update Submission
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   size="lg"
//                   className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-6 py-3 rounded-lg shadow-lg shadow-purple-500/20"
//                 >
//                   Submit
//                 </Button>
//               )}
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default RoundSubmissionPage;
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';

export interface teamDetailsType {
  name: string;
  year: string;
  dept: string;
  isTeamLead: boolean;
}

const Themes = ['Med-Tech', 'Fin-Tech', 'Cyber Security', 'Generative AI'];

function RoundSubmissionPage() {
  const [teamDetails, setTeamDetails] = useState<teamDetailsType[] | undefined>(
    undefined
  );
  const [teamName, setTeamName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [problems, setProblems] = useState<{ sno: string; title: string }[]>(
    []
  );
  const [formData, setFormData] = useState({
    problemId: '',
    solutionTitle: '',
    description: '',
  });
  const [flag, setFlag] = useState<boolean>(false);
  const [isTeamSubmitted, setIsTeamSubmitted] = useState<boolean>(false); // Tracks submission state
  const [showForm, setShowForm] = useState<boolean>(false); // Controls form visibility

  const { data: session, status } = useSession();
  const router = useRouter();

  const getTeamDetails = async () => {
    try {
      const res = await axios.get('/api/users/isinateam', {
        headers: { email: session?.user?.email },
      });

      if (res.status === 200 && res.data.teamdetails) {
        const teamSubmission = res.data.teamdetails.team.teamSubmisison;
        if (teamSubmission) {
          setFormData({
            problemId: teamSubmission.problem.sno,
            solutionTitle: teamSubmission.solutionTitle,
            description: teamSubmission.description,
          });
          setSelectedTheme(teamSubmission.problem.theme);
          setProblems([
            {
              sno: teamSubmission.problem.sno,
              title: teamSubmission.problem.title,
            },
          ]);
          setIsTeamSubmitted(true);
        }
        setTeamName(res.data.teamdetails.team.name);
        setTeamDetails(res.data.teamdetails.team.members);
      }
      setFlag(true);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch team details.');
    }
  };

  const getProblemsForTheme = async (theme: string) => {
    try {
      const res = await axios.post('/api/users/getps', { theme });
      if (res.status === 200 && res.data.ps) {
        setProblems(res.data.ps);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to fetch problems.');
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('Login First');
      router.push('/');
    } else if (status === 'authenticated') {
      getTeamDetails();
    }
  }, [status]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(e.target.value);
    getProblemsForTheme(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/submitidea', formData, {
        headers: { email: session?.user?.email },
      });
      if (res.data.success) {
        alert(res.data.message);
        setIsTeamSubmitted(true);
        setShowForm(false);
      } else {
        alert('Failed to submit your solution.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to submit. Please try again.');
    }
  };

  const handleUpdateSubmission = async () => {
    setShowForm(true);
  };

  if (status === 'loading' || !flag) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

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
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg"
                >
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

          {!showForm && isTeamSubmitted ? (
            // <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            //   <h2 className="text-3xl font-bold mb-6">View Submission</h2>
            //   <p><strong>Theme:</strong> {selectedTheme}</p>
            //   <p><strong>Problem Statement:</strong> {problems[0]?.title}</p>
            //   <p><strong>Solution Title:</strong> {formData.solutionTitle}</p>
            //   <p><strong>Description:</strong> {formData.description}</p>
            //   <Button
            //     onClick={handleUpdateSubmission}
            //     size="lg"
            //     className="mt-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-6 py-3 rounded-lg shadow-lg shadow-purple-500/20"
            //   >
            //     Update Submission
            //   </Button>
            // </div>
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700 max-w-3xl mx-auto">
              <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                View Submission
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  <strong className="text-blue-400">Theme:</strong>
                  <span className="ml-2 text-gray-300">{selectedTheme}</span>
                </p>
                <p className="text-lg">
                  <strong className="text-purple-400">
                    Problem Statement:
                  </strong>
                  <span className="ml-2 text-gray-300">
                    {problems[0]?.title}
                  </span>
                </p>
                <p className="text-lg">
                  <strong className="text-pink-400">Solution Title:</strong>
                  <span className="ml-2 text-gray-300">
                    {formData.solutionTitle}
                  </span>
                </p>
                <p className="text-lg">
                  <strong className="text-yellow-400">Description:</strong>
                  <span className="ml-2 text-gray-300">
                    {formData.description}
                  </span>
                </p>
              </div>
              <div className="mt-8 text-center">
                <Button
                  onClick={handleUpdateSubmission}
                  size="lg"
                  className="w-full sm:w-auto px-6 py-3 text-xl font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 rounded-lg shadow-lg shadow-purple-500/30 transition-transform transform hover:scale-105"
                >
                  Update Submission
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                {isTeamSubmitted
                  ? 'Update Your Solution'
                  : 'Submit Your Solution'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Select Theme
                  </label>
                  <select
                    name="theme"
                    value={selectedTheme}
                    onChange={handleThemeChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a theme</option>
                    {Themes.map((theme, index) => (
                      <option key={index} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedTheme && (
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Select Problem Statement
                    </label>
                    <select
                      name="problemId"
                      value={formData.problemId}
                      //@ts-expect-errorthemechangeerror
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select a problem</option>
                      {problems.map((problem, index) => (
                        <option key={index} value={problem.sno}>
                          {problem.sno}: {problem.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

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
                  {isTeamSubmitted ? 'Update Submission' : 'Submit'}
                </Button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default RoundSubmissionPage;
