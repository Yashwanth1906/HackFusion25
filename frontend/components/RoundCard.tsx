'use client'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RocketIcon, LightbulbIcon, TrophyIcon, LockIcon, CheckCircleIcon } from 'lucide-react';


export interface Round {
    id: number;
    title: string;
    description: string;
    icon: string;
    status: 'locked' | 'active' | 'completed';
    deadline: string;
  }

const icons = {
  rocket: RocketIcon,
  bulb: LightbulbIcon,
  trophy: TrophyIcon,
};

interface RoundCardProps {
  round: Round;
  position: 'left' | 'right';
}

export function RoundCard({ round, position }: RoundCardProps) {
  const Icon = icons[round.icon as keyof typeof icons];

  return (
    <motion.div
      className={`flex items-center gap-8 ${
        position === 'left' ? 'flex-row' : 'flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`w-1/2 ${position === 'left' ? 'text-right' : 'text-left'}`}>
        <motion.div
          className={`inline-block p-8 rounded-2xl backdrop-blur-lg border transition-all duration-300 ${
            round.status === 'completed'
              ? 'bg-blue-900/60 border-blue-500'
              : round.status === 'active'
              ? 'bg-purple-900/60 border-purple-500'
              : 'bg-gray-900/60 border-gray-600'
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-xl ${
              round.status === 'completed' ? 'bg-blue-500' : 
              round.status === 'active' ? 'bg-purple-500' : 'bg-gray-600'
            }`}>
              <Icon className="w-8 h-8" />
            </div>
            <Badge variant={round.status === 'completed' ? 'default' : 'secondary'}>
              {round.status === 'locked' && <LockIcon className="w-3 h-3 mr-1" />}
              {round.status === 'completed' && <CheckCircleIcon className="w-3 h-3 mr-1" />}
              {round.status}
            </Badge>
          </div>

          <h3 className="text-2xl font-bold mb-2">{round.title}</h3>
          <p className="text-gray-300 mb-4">{round.description}</p>
          <p className="text-sm text-gray-400 mb-6">Deadline: {round.deadline}</p>

          <Button 
            className={`w-full ${
              round.status === 'locked' 
                ? 'bg-gray-700 cursor-not-allowed' 
                : round.status === 'completed'
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
            disabled={round.status === 'locked'}
          >
            {round.status === 'completed' ? 'View Submission' : 'Submit Solution'}
          </Button>
        </motion.div>
      </div>
      <div className="w-1/2" />
    </motion.div>
  );
}