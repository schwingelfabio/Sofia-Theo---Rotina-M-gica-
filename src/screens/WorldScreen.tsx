import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../state/GameContext';
import { ROUTINES, WORLD_TITLES, WORLD_COLORS, RoutineTask } from '../data/routines';
import { Sun, Shield, Shirt, Backpack, BookOpen, Users, Smile, Hand, Puzzle, ArrowLeft, CheckCircle2 } from 'lucide-react';

const IconMap = {
  sun: Sun,
  toothbrush: Shield,
  shirt: Shirt,
  backpack: Backpack,
  book: BookOpen,
  users: Users,
  smile: Smile,
  hand: Hand,
  puzzle: Puzzle,
};

interface WorldScreenProps {
  worldId: string;
  onBack: () => void;
  onLaunchMiniGame: (taskId: string) => void;
}

export const WorldScreen: React.FC<WorldScreenProps> = ({ worldId, onBack, onLaunchMiniGame }) => {
  const { completedRoutines, completeRoutine, addHearts, language } = useGame();
  
  const isPt = language === 'pt';
  const tasks = ROUTINES[worldId] || [];
  
  // Local state for tasks that are "done" in this session, 
  // though we could just rely on completedRoutines from Context.
  // We'll rely on Context so it persists!
  const todoTasks = tasks.filter(t => !completedRoutines.includes(t.id));
  const doneTasks = tasks.filter(t => completedRoutines.includes(t.id));

  const handleTaskAction = (task: RoutineTask) => {
    if (!completedRoutines.includes(task.id)) {
      // Launch mini game instead of immediate completion
      // We'll just launch the minigame if it's not done.
      onLaunchMiniGame(task.id);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center mb-6 px-2">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md border-b-4 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-[#008080] hover:-translate-y-0.5 transition-all mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className={`text-2xl sm:text-3xl font-black ${WORLD_COLORS[worldId]} tracking-tight`}>
          {isPt ? WORLD_TITLES[worldId].pt : WORLD_TITLES[worldId].en}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* TO DO COLUMN */}
        <div className="bg-white dark:bg-slate-800 rounded-[32px] shadow-xl border-4 border-white dark:border-slate-700 p-6 flex flex-col min-h-[400px]">
          <h2 className="text-lg font-bold text-[#008080] dark:text-teal-400 mb-6 flex items-center gap-2">
            {isPt ? 'Minha Rotina' : 'My Routine'}
          </h2>
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {todoTasks.map(task => {
                const Icon = IconMap[task.iconType];
                return (
                  <motion.button
                    layoutId={`task-${task.id}`}
                    key={task.id}
                    onClick={() => handleTaskAction(task)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-[#E6F4F1] dark:bg-slate-700 rounded-2xl border-2 border-[#008080]/20 dark:border-slate-600 flex items-center gap-4 w-full text-left shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-[#008080] dark:text-[#4fd1d1] flex items-center justify-center shadow-sm shrink-0">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-[#008080] dark:text-slate-100">{isPt ? task.title.pt : task.title.en}</h4>
                      <p className="text-xs text-[#008080]/80 dark:text-teal-400 font-medium">{isPt ? 'Toque para iniciar' : 'Tap to start'} (+{task.reward} &hearts;)</p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
            {todoTasks.length === 0 && (
              <div className="text-center py-10 text-slate-400 font-medium">
                {isPt ? 'Tudo pronto aqui! 🎉' : 'All done here! 🎉'}
              </div>
            )}
          </div>
        </div>

        {/* DONE COLUMN */}
        <div className="bg-[#F0F9F9] dark:bg-slate-800/50 rounded-[32px] shadow-inner border-4 border-white/50 dark:border-slate-700 p-6 flex flex-col min-h-[400px]">
          <h2 className="text-lg font-bold text-[#2D3748] dark:text-slate-400 mb-6 flex items-center gap-2 opacity-60">
            {isPt ? 'Concluídos' : 'Completed'}
          </h2>
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {doneTasks.map(task => {
                const Icon = IconMap[task.iconType];
                return (
                  <motion.div
                    layoutId={`task-${task.id}`}
                    key={task.id}
                    className="p-4 bg-[#F3F0FF] dark:bg-slate-700/50 rounded-2xl border-2 border-[#9370DB]/20 dark:border-slate-600 flex items-center gap-4 w-full text-left opacity-70"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-[#9370DB] dark:text-[#ab8af0] flex items-center justify-center shadow-sm shrink-0">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-[#9370DB] dark:text-[#ab8af0] line-through decoration-2">{isPt ? task.title.pt : task.title.en}</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#9370DB] flex items-center justify-center text-white shrink-0">
                      <CheckCircle2 size={16} fill="currentColor" className="text-[#9370DB]" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};
