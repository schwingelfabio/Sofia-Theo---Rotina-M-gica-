import React, { useState } from 'react';
import { GameProvider, useGame } from './state/GameContext';
import { AuthProvider } from './state/AuthContext';
import { Heart, Sparkles, User, Settings as SettingsIcon, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { HomeScreen } from './screens/HomeScreen';
import { WorldScreen } from './screens/WorldScreen';
import { MiniGameScreen } from './screens/MiniGameScreen';
import { ParentalDashboard } from './screens/ParentalDashboard';
import { BreathingSOSModal } from './components/BreathingSOSModal';

function AppContent() {
  const { hearts, isDarkMode, toggleDarkMode, language, toggleLanguage } = useGame();
  const [currentScreen, setCurrentScreen] = useState<'home' | 'world' | 'parental'>('home');
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);
  const [activeMiniGame, setActiveMiniGame] = useState<string | null>(null);
  const [sosOpen, setSosOpen] = useState(false);

  const isPt = language === 'pt';

  const handleSelectWorld = (worldId: string) => {
    setSelectedWorld(worldId);
    setCurrentScreen('world');
  };

  const handleBackToHome = () => {
    setSelectedWorld(null);
    setCurrentScreen('home');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out flex flex-col font-sans ${isDarkMode ? 'bg-slate-900 text-slate-100 border-8 border-slate-700/50' : 'bg-[#F0F9F9] text-[#2D3748] border-8 border-[#008080]/20'}`}>
      
      {/* Top Navigation */}
      <header className="h-20 bg-white dark:bg-slate-800 border-b-4 border-[#008080]/10 dark:border-slate-700 flex items-center justify-between px-4 sm:px-8 shadow-sm m-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBackToHome}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#008080] rounded-2xl flex items-center justify-center shadow-lg text-white hover:scale-105 transition-transform"
          >
            <Sparkles size={24} />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-xl sm:text-2xl font-black text-[#008080] tracking-tight leading-none mt-1">Sofia & Theo</h1>
            <p className="text-[10px] sm:text-xs font-bold text-[#9370DB] uppercase tracking-widest leading-tight">
              {isPt ? 'Rotina Mágica' : 'Magic Routine'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 bg-[#FFF5F7] dark:bg-pink-900/40 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-[#FF69B4]/30 shadow-sm">
            <Heart fill="#FF69B4" strokeWidth={0} size={20} className="text-[#FF69B4]" />
            <span className="text-lg sm:text-xl font-bold text-[#FF69B4]">{hearts}</span>
          </div>

          <div className="flex gap-2 sm:gap-4">
            <button 
               onClick={toggleLanguage}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-400 dark:bg-slate-700 dark:text-slate-200 flex items-center justify-center hover:scale-105 transition-transform border-4 border-[#008080]/10 dark:border-slate-600 shadow-md font-bold text-sm"
              aria-label="Toggle Language"
            >
              {language.toUpperCase()}
            </button>

            <button 
               onClick={() => setCurrentScreen('parental')}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#9370DB] text-white flex items-center justify-center hover:scale-105 transition-transform border-4 border-white shadow-md"
              aria-label="Painel dos Pais"
            >
              <User size={20} />
            </button>

            <button 
               onClick={toggleDarkMode}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-400 dark:bg-slate-700 dark:text-slate-200 flex items-center justify-center hover:scale-105 transition-transform border-4 border-[#008080]/10 dark:border-slate-600 shadow-md"
              aria-label="Alternar Tema Escuro"
            >
              <SettingsIcon size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen + (selectedWorld || '')}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {currentScreen === 'home' && (
              <HomeScreen onSelectWorld={handleSelectWorld} />
            )}
            
            {currentScreen === 'world' && selectedWorld && (
              <WorldScreen 
                worldId={selectedWorld} 
                onBack={handleBackToHome} 
                onLaunchMiniGame={setActiveMiniGame}
              />
            )}

            {currentScreen === 'parental' && (
              <ParentalDashboard onBack={handleBackToHome} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating SOS Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setSosOpen(true)}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FF4747] shadow-2xl flex items-center justify-center text-white motion-safe:animate-pulse hover:scale-110 transition-transform border-4 sm:border-8 border-white dark:border-slate-800"
          aria-label="Botão Calma SOS"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-1">🧘</span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase leading-none tracking-wider text-white shadow-black/10">SOS</span>
          </div>
        </button>
      </div>

      {/* Mini Game Modal */}
      {activeMiniGame && (
        <MiniGameScreen 
          taskId={activeMiniGame} 
          onComplete={() => setActiveMiniGame(null)} 
          onCancel={() => setActiveMiniGame(null)}
        />
      )}

      {/* SOS Breathing Modal */}
      <AnimatePresence>
        {sosOpen && <BreathingSOSModal onClose={() => setSosOpen(false)} />}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </AuthProvider>
  );
}
