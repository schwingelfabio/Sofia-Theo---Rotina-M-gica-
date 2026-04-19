import React from 'react';
import { useGame } from '../state/GameContext';
import { useAuth } from '../state/AuthContext';
import { loginWithGoogle, logout } from '../lib/firebase';
import { ROUTINES } from '../data/routines';
import { ArrowLeft, LineChart, Trophy, Settings, Crown, ExternalLink, LogOut, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { playClick } from '../lib/audio';

export const ParentalDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { hearts, completedRoutines, language, sensoryMode, toggleSensoryMode } = useGame();
  const { user, isAdmin } = useAuth();

  const isPt = language === 'pt';

  const totalTasks = Object.values(ROUTINES).flat().length;
  const progressPercent = Math.round((completedRoutines.length / totalTasks) * 100) || 0;

  const handleBack = () => {
    playClick();
    onBack();
  };

  const handleLogin = () => {
    playClick();
    loginWithGoogle();
  };

  const handleLogout = () => {
    playClick();
    logout();
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-10 px-2">
        <button 
          onClick={handleBack}
          className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md border-b-4 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-[#9370DB] hover:-translate-y-0.5 transition-all mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
           <h2 className="text-3xl font-black text-[#9370DB] dark:text-[#ab8af0] tracking-tight">{isPt ? 'Dashboard dos Pais' : 'Parent Dashboard'}</h2>
           <p className="text-[#008080] dark:text-[#4fd1d1] font-bold uppercase tracking-widest text-[10px] mt-1">{isPt ? 'Conecta TEA' : 'Connect ASD'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-xl border-4 border-white dark:border-slate-700 mb-8">
        <div className="flex items-center gap-4 mb-6 text-[#2D3748] dark:text-slate-200">
          <LineChart className="text-[#9370DB] dark:text-[#ab8af0]" size={28} />
          <h3 className="text-2xl font-bold">{isPt ? 'Progresso de Hoje' : "Today's Progress"}</h3>
        </div>
        
        <div className="mb-3 flex justify-between text-sm font-bold text-[#2D3748]/60 dark:text-slate-400 tracking-wide">
          <span className="uppercase">{isPt ? 'Rotinas Concluídas' : 'Completed Routines'}</span>
          <span>{completedRoutines.length} / {totalTasks}</span>
        </div>
        <div className="w-full bg-[#F3F0FF] dark:bg-slate-700 h-6 rounded-full overflow-hidden border-2 border-[#9370DB]/10 dark:border-slate-600 shadow-inner">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${progressPercent}%` }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="h-full bg-[#9370DB] dark:bg-[#ab8af0] rounded-full"
           />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-[32px] p-6 shadow-xl border-4 border-white dark:border-slate-700 flex flex-col items-center justify-center text-center">
          <Trophy size={40} className="text-[#FF69B4] mb-3 drop-shadow-sm" />
          <p className="text-5xl font-black text-[#2D3748] dark:text-slate-100">{hearts}</p>
          <p className="text-xs font-bold text-[#2D3748]/60 dark:text-slate-400 uppercase tracking-widest mt-2">{isPt ? 'Corações' : 'Hearts'}</p>
        </div>
        
        <div className="bg-[#E6F4F1] dark:bg-[#008080]/30 rounded-[32px] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#d6eae6] dark:hover:bg-[#008080]/50 transition-colors border-2 border-[#008080]/20 dark:border-[#008080]/40">
          <Settings size={36} className="text-[#008080] dark:text-[#4fd1d1] mb-3" />
          <p className="font-bold text-[#008080] dark:text-[#4fd1d1] text-sm uppercase tracking-wider">{isPt ? 'Exportar' : 'Export'}<br/>{isPt ? 'Relatório' : 'Report'}</p>
        </div>
      </div>
      
      <div className="bg-[#E6F4F1] dark:bg-[#008080]/10 rounded-[32px] p-6 px-8 border-2 border-[#008080]/30 dark:border-[#008080]/20 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-[#008080] dark:text-[#4fd1d1] text-lg">
            {isPt ? 'Neuro-Filtro (Modo Sensorial)' : 'Neuro-Filter (Sensory Mode)'}
          </h4>
          <button 
            onClick={() => { playClick(); toggleSensoryMode(); }}
            className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-colors ${sensoryMode === 'normal' ? 'bg-[#FF69B4] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
          >
            {isPt ? (sensoryMode === 'normal' ? 'Normal' : 'Simplificado') : (sensoryMode === 'normal' ? 'Normal' : 'Simplified')}
          </button>
        </div>
        <p className="text-sm text-[#2D3748]/80 dark:text-slate-300 font-medium">
          {isPt ? 'Ajuste a complexidade visual e sensorial do mundo.' : 'Adjust the visual and sensory complexity of the world.'}
        </p>
      </div>
      
      <div className="bg-[#FFF5F7] dark:bg-[#FF69B4]/10 rounded-[32px] p-6 px-8 border-2 border-[#FF69B4]/30 dark:border-[#FF69B4]/20 shadow-sm mb-6">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-bold text-[#FF69B4] dark:text-[#ff8fca] text-lg">
            {isPt ? 'Sincronização em Nuvem' : 'Cloud Sync'}
          </h4>
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">
              <LogOut size={16} /> {isPt ? 'Sair' : 'Log out'}
            </button>
          ) : (
            <button onClick={handleLogin} className="flex items-center gap-2 text-sm font-bold bg-[#FF69B4] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#ff52a3] transition-colors">
              <LogIn size={16} /> {isPt ? 'Fazer Login' : 'Log in'}
            </button>
          )}
        </div>
        
        {user ? (
          <p className="text-sm text-[#2D3748]/80 dark:text-slate-300 font-medium leading-relaxed">
            {isPt ? `Logado como ${user.email}. O progresso está sincronizado e seguro!` : `Logged in as ${user.email}. Progress is synced and safe!`}
            {isAdmin && <span className="block mt-2 text-[#008080] font-bold text-xs uppercase bg-[#008080]/10 px-2 py-1 rounded-lg inline-block">Modo Admin Ativado</span>}
          </p>
        ) : (
          <p className="text-sm text-[#2D3748]/80 dark:text-slate-300 font-medium leading-relaxed">
            {isPt ? 'Faça login para salvar o progresso de Sofia e Theo na nuvem de forma segura e sincronizar entre dispositivos.' : "Log in to save Sofia and Theo's progress securely to the cloud and sync across devices."}
          </p>
        )}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          playClick();
          window.open('https://www.conectateaia.com.br', '_blank');
        }}
        className="w-full bg-[#008080] text-white rounded-[32px] p-5 shadow-lg border-4 border-white dark:border-slate-700 mb-8 flex items-center justify-between group cursor-pointer hover:bg-[#006666] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
            <ExternalLink size={24} />
          </div>
          <div className="text-left">
            <h4 className="font-black text-xl tracking-tight">Conecta TEA</h4>
            <p className="text-white/80 font-medium text-xs leading-tight">
              {isPt ? 'Acesse o site oficial para mais recursos e suporte.' : 'Access the official website for more resources and support.'}
            </p>
          </div>
        </div>
      </motion.button>

      {/* NEW VIP BUTTONS FOR PARENTS */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* VIP Mensal */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            playClick();
            window.open(isPt ? 'https://buy.stripe.com/8x214o1fH8TI8jKaXh2wU06' : 'https://buy.stripe.com/cNifZigaB9XM8jK9Td2wU02', '_blank');
          }}
          className="w-full bg-white dark:bg-slate-800 text-[#2D3748] dark:text-white rounded-[32px] p-6 border-4 border-[#FFA500]/30 shadow-md flex flex-col items-center gap-4 cursor-pointer relative overflow-hidden group"
        >
          <div className="w-12 h-12 bg-[#FFF5E6] dark:bg-[#FFA500]/10 rounded-2xl flex items-center justify-center border-2 border-[#FFA500]/20 text-[#FFA500] group-hover:rotate-12 transition-transform z-10 shrink-0">
            <Crown size={24} />
          </div>
          <div className="text-center z-10">
            <h4 className="font-black text-xl text-[#FFA500] tracking-tight">{isPt ? 'VIP Mensal' : 'Monthly VIP'}</h4>
            <div className="text-2xl font-black text-[#2D3748] dark:text-white mt-1 mb-2">
              {isPt ? 'R$ 9,99' : '$3.99'}<span className="text-xs font-bold text-gray-400">{isPt ? '/mês' : '/mo'}</span>
            </div>
            <p className="text-[#2D3748]/70 dark:text-slate-300 font-bold text-xs">{isPt ? 'Cenários extras!' : 'Extra scenarios!'}</p>
          </div>
          <div className="bg-[#FFA500] text-white font-black px-4 py-3 w-full rounded-2xl uppercase tracking-wider text-xs shadow-sm z-10 group-hover:bg-[#FF8C00] transition-colors mt-auto">
            {isPt ? 'Assinar Mensal' : 'Subscribe'}
          </div>
        </motion.button>

        {/* VIP Anual */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            playClick();
            window.open(isPt ? 'https://buy.stripe.com/4gMdRa9Mdfi643u1mH2wU07' : 'https://buy.stripe.com/cNibJ2bUlfi643u5CX2wU03', '_blank');
          }}
          className="w-full bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] text-white rounded-[32px] p-6 border-4 border-white dark:border-slate-700 shadow-xl shadow-[#FFA500]/30 flex flex-col items-center gap-4 cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute top-3 right-3 bg-[#FF4747] text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-md z-20 animate-pulse border border-white/50">
            {isPt ? '2 Meses Grátis!' : '2 Months Free!'}
          </div>
          <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center border-2 border-white/40 text-white shadow-inner group-hover:rotate-12 transition-transform z-10 shrink-0">
            <Crown size={24} className="drop-shadow-sm" />
          </div>
          <div className="text-center z-10">
            <h4 className="font-black text-xl drop-shadow-sm tracking-tight text-white">{isPt ? 'VIP Anual' : 'Annual VIP'}</h4>
            <div className="text-2xl font-black text-white mt-1 mb-2 drop-shadow-sm">
              {isPt ? 'R$ 99,90' : '$39.99'}<span className="text-xs font-bold text-white/80">{isPt ? '/ano' : '/yr'}</span>
            </div>
            <p className="text-white/95 font-bold text-xs drop-shadow-sm">{isPt ? 'Diversão sem limites!' : 'Unlimited Fun!'}</p>
          </div>
          <div className="bg-white text-[#FFA500] font-black px-4 py-3 w-full rounded-2xl uppercase tracking-wider text-xs shadow-md z-10 group-hover:bg-[#FFF5E6] transition-colors mt-auto">
            {isPt ? 'Assinar Anual' : 'Subscribe'}
          </div>

          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
        </motion.button>
      </div>
    </div>
  );
};
