import React from 'react';
import { motion } from 'motion/react';
import { Home, School, Trees, Star, Heart, Crown, UserCircle2 } from 'lucide-react';
import { useGame } from '../state/GameContext';
import { playClick } from '../lib/audio';

interface WorldCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const WorldCard: React.FC<WorldCardProps> = ({ title, subtitle, icon, color, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        playClick();
        onClick();
      }}
      className={`w-full ${color} rounded-[32px] p-6 text-left relative overflow-hidden shadow-xl border-4 border-white dark:border-slate-700`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div className="bg-white/30 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-inner">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-1 shadow-black/10 text-shadow-sm">{title}</h3>
          <p className="text-white/90 font-medium text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
    </motion.button>
  );
};

export const HomeScreen: React.FC<{ onSelectWorld: (worldId: string) => void }> = ({ onSelectWorld }) => {
  const { language, activeCharacter, setActiveCharacter } = useGame();
  
  const isPt = language === 'pt';

  const texts = {
    title: isPt ? 'Onde vamos hoje?' : 'Where are we going today?',
    subtitle: isPt ? 'Escolha uma aventura com Sofia e Theo.' : 'Choose an adventure with Sofia and Theo.',
    homeTitle: isPt ? 'Casa Mágica' : 'Magic Home',
    homeSub: isPt ? 'Acordar, vestir, comer e cuidar de mim!' : 'Wake up, dress, eat and take care of myself!',
    schoolTitle: isPt ? 'Escola Amiga' : 'Friendly School',
    schoolSub: isPt ? 'Aprender, brincar e pedir ajuda se precisar!' : 'Learn, play and ask for help if needed!',
    parkTitle: isPt ? 'Parque da Conexão' : 'Connection Park',
    parkSub: isPt ? 'Turnos, amigos e muita diversão lá fora!' : 'Taking turns, friends, and fun outside!',
    vipMonthly: isPt ? 'VIP Mensal' : 'Monthly VIP',
    vipMonthlySub: isPt ? 'Mais cenários e conteúdos liberados!' : 'More scenarios and content unlocked!',
    vipMonthlyPrice: isPt ? 'R$ 9,99' : '$3.99',
    vipMonthlyLabel: isPt ? '/mês' : '/mo',
    vipMonthlyBtn: isPt ? 'Assinar Mensal' : 'Subscribe Monthly',
    vipMonthlyLink: isPt ? 'https://buy.stripe.com/8x214o1fH8TI8jKaXh2wU06' : 'https://buy.stripe.com/cNifZigaB9XM8jK9Td2wU02',
    vipAnnual: isPt ? 'VIP Anual 🌟' : 'Annual VIP 🌟',
    vipAnnualBadge: isPt ? '2 Meses Grátis!' : '2 Months Free!',
    vipAnnualSub: isPt ? 'Diversão o ano todo sem limites!' : 'Fun all year long with no limits!',
    vipAnnualPrice: isPt ? 'R$ 99,90' : '$39.99',
    vipAnnualLabel: isPt ? '/ano' : '/yr',
    vipAnnualBtn: isPt ? 'Assinar Anual' : 'Subscribe Annual',
    vipAnnualLink: isPt ? 'https://buy.stripe.com/4gMdRa9Mdfi643u1mH2wU07' : 'https://buy.stripe.com/cNibJ2bUlfi643u5CX2wU03',
    theoTitle: isPt ? 'Mensagem do Theo' : "Theo's Message",
    theoMsg: isPt ? 'Ei! Lembra que não tem pressa. Você pode escolher a atividade que quiser, no seu próprio tempo! 🌟' : 'Hey! Remember there is no rush. You can choose the activity you want, in your own time! 🌟'
  };

  const handleCharacterSelect = (char: 'sofia' | 'theo') => {
    playClick();
    setActiveCharacter(char);
  };

  return (
    <div className="p-6 md:p-8">
      {/* CHARACTER SELECTOR */}
      <div className="flex justify-center gap-6 mb-8">
        <button 
          onClick={() => handleCharacterSelect('sofia')}
          className={`relative group flex flex-col items-center transition-transform ${activeCharacter === 'sofia' ? 'scale-110' : 'scale-90 opacity-70 hover:scale-100 hover:opacity-100'}`}
        >
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 shadow-xl flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 overflow-hidden ${activeCharacter === 'sofia' ? 'border-[#FF69B4] shadow-[#FF69B4]/30' : 'border-white'}`}>
             <UserCircle2 size={48} className="text-[#FF69B4]" />
          </div>
          <span className={`mt-2 font-black tracking-widest uppercase text-sm ${activeCharacter === 'sofia' ? 'text-[#FF69B4]' : 'text-slate-400'}`}>Sofia</span>
        </button>

        <button 
          onClick={() => handleCharacterSelect('theo')}
          className={`relative group flex flex-col items-center transition-transform ${activeCharacter === 'theo' ? 'scale-110' : 'scale-90 opacity-70 hover:scale-100 hover:opacity-100'}`}
        >
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 shadow-xl flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-200 overflow-hidden ${activeCharacter === 'theo' ? 'border-[#008080] shadow-[#008080]/30' : 'border-white'}`}>
            <UserCircle2 size={48} className="text-[#008080]" />
          </div>
          <span className={`mt-2 font-black tracking-widest uppercase text-sm ${activeCharacter === 'theo' ? 'text-[#008080]' : 'text-slate-400'}`}>Theo</span>
        </button>
      </div>

      <div className="text-center mb-10">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: 'spring', bounce: 0.5 }}
           className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-slate-800 shadow-lg border-2 border-[#008080]/10 rounded-full mb-4 text-[#008080] dark:text-[#00caca]"
        >
          <Star size={40} fill="currentColor" />
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-black text-[#008080] dark:text-[#00caca] tracking-tight">{texts.title}</h1>
        <p className="mt-4 text-lg font-bold text-[#9370DB] dark:text-[#b193f0]">{texts.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <WorldCard 
          title={texts.homeTitle} 
          subtitle={texts.homeSub} 
          icon={<Home size={32} />} 
          color="bg-[#FF69B4] hover:bg-[#ff52a3]" 
          onClick={() => onSelectWorld('home')}
        />
        <WorldCard 
          title={texts.schoolTitle} 
          subtitle={texts.schoolSub} 
          icon={<School size={32} />} 
          color="bg-[#008080] hover:bg-[#006666]" 
          onClick={() => onSelectWorld('school')}
        />
        <WorldCard 
          title={texts.parkTitle} 
          subtitle={texts.parkSub} 
          icon={<Trees size={32} />} 
          color="bg-[#9370DB] hover:bg-[#8260C7]" 
          onClick={() => onSelectWorld('park')}
        />
      </div>

      {/* NEW VIP BUTTONS */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* VIP Mensal */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(texts.vipMonthlyLink, '_blank')}
          className="relative overflow-hidden bg-white dark:bg-slate-800 text-[#2D3748] dark:text-white rounded-[32px] p-6 shadow-xl border-4 border-[#FFA500]/30 flex flex-col items-center text-center gap-4 cursor-pointer group"
        >
          <div className="w-16 h-16 bg-[#FFF5E6] dark:bg-[#FFA500]/10 rounded-2xl flex items-center justify-center shrink-0 border-2 border-[#FFA500]/20 group-hover:rotate-12 transition-transform">
             <Crown size={32} className="text-[#FFA500]" />
          </div>
          <div className="flex-1 z-10 space-y-1">
            <h3 className="text-2xl font-black text-[#FFA500] tracking-tight">{texts.vipMonthly}</h3>
            <p className="text-[#2D3748]/70 dark:text-slate-300 font-bold text-sm">{texts.vipMonthlySub}</p>
            <div className="text-3xl font-black text-[#2D3748] dark:text-white mt-3 mb-2 tracking-tight">
              {texts.vipMonthlyPrice}<span className="text-sm font-bold text-gray-400">{texts.vipMonthlyLabel}</span>
            </div>
          </div>
          <div className="bg-[#FFA500] text-white font-black px-8 py-4 rounded-2xl uppercase tracking-wider text-sm shadow-md group-hover:bg-[#FF8C00] transition-colors w-full z-10">
            {texts.vipMonthlyBtn}
          </div>
        </motion.button>

        {/* VIP Anual */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(texts.vipAnnualLink, '_blank')}
          className="relative overflow-hidden bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] text-white rounded-[32px] p-6 shadow-2xl shadow-[#FFA500]/40 border-4 border-white dark:border-slate-700 flex flex-col items-center text-center gap-4 cursor-pointer group"
        >
          <div className="absolute top-4 right-4 bg-[#FF4747] text-white text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-20 animate-pulse border-2 border-white/50">
            {texts.vipAnnualBadge}
          </div>
          <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center shrink-0 border-2 border-white/40 group-hover:rotate-12 transition-transform shadow-inner">
             <Crown size={36} className="text-white drop-shadow-md" />
          </div>
          <div className="flex-1 z-10 space-y-1">
            <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md">{texts.vipAnnual}</h3>
            <p className="text-white/95 font-bold text-sm drop-shadow-sm">{texts.vipAnnualSub}</p>
            <div className="text-4xl font-black text-white mt-2 mb-2 drop-shadow-md tracking-tight">
              {texts.vipAnnualPrice}<span className="text-sm font-bold text-white/80">{texts.vipAnnualLabel}</span>
            </div>
          </div>
          <div className="bg-white text-[#FFA500] font-black px-8 py-4 rounded-2xl uppercase tracking-wider text-sm shadow-xl group-hover:bg-[#FFF5E6] transition-colors w-full z-10">
            {texts.vipAnnualBtn}
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
        </motion.button>
      </div>
      
      <div className="mt-10 bg-white dark:bg-slate-800 rounded-[32px] p-6 shadow-xl border-4 border-white dark:border-slate-700 text-center max-w-xl mx-auto">
         <h3 className="font-bold text-lg text-[#008080] dark:text-teal-400 mb-2 flex items-center justify-center gap-2">
           <Heart fill="#008080" className="text-[#008080]" size={20} />
           {texts.theoTitle}
         </h3>
         <p className="text-[#2D3748] dark:text-slate-300 font-medium">{texts.theoMsg}</p>
      </div>
    </div>
  );
};
