'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';

function CreateProblemStatementPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  // const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        '/api/admin/createproblemstatement',
        formData,
        {
          headers: { email: session?.user?.email },
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        setFormData({ title: '', theme: '', description: '' });
        setShowForm(false);
      } else {
        alert('Failed to create problem statement.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  //   if (status === 'unauthenticated') {
  //     alert('Login First');
  //     router.push('/');
  //     return null;
  //   }

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
              HackFusion Admin Panel
            </h1>
            <h2 className="text-4xl text-gray-300">Create Problem Statement</h2>
          </motion.div>

          <div className="text-center mb-12">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-6 py-3 rounded-lg shadow-lg shadow-purple-500/20"
            >
              {showForm ? 'Cancel' : 'Add Problem Statement'}
            </Button>
          </div>

          {showForm && (
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Problem Statement Form
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Theme
                  </label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select a theme
                    </option>
                    <option value="Technology">Technology</option>
                    <option value="Environment">Environment</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-6 py-3 rounded-lg shadow-lg shadow-purple-500/20"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CreateProblemStatementPage;
