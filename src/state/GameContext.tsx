import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameState {
  hearts: number;
  completedRoutines: string[];
  unlockedItems: string[];
  isDarkMode: boolean;
  language: 'pt' | 'en';
  addHearts: (amount: number) => void;
  completeRoutine: (routineId: string) => void;
  unlockItem: (itemId: string) => void;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
}

const defaultState: GameState = {
  hearts: 0,
  completedRoutines: [],
  unlockedItems: [],
  isDarkMode: false,
  language: 'pt',
  addHearts: () => {},
  completeRoutine: () => {},
  unlockItem: () => {},
  toggleDarkMode: () => {},
  toggleLanguage: () => {},
};

const GameContext = createContext<GameState>(defaultState);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hearts, setHearts] = useState(0);
  const [completedRoutines, setCompletedRoutines] = useState<string[]>([]);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  // Load from localStorage for persistence
  useEffect(() => {
    const saved = localStorage.getItem('sofiaTheoGameState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.hearts) setHearts(parsed.hearts);
        if (parsed.completedRoutines) setCompletedRoutines(parsed.completedRoutines);
        if (parsed.unlockedItems) setUnlockedItems(parsed.unlockedItems);
        if (parsed.isDarkMode !== undefined) setIsDarkMode(parsed.isDarkMode);
        if (parsed.language !== undefined) setLanguage(parsed.language);
      } catch (e) {
        console.error('Failed to load game state', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('sofiaTheoGameState', JSON.stringify({
      hearts,
      completedRoutines,
      unlockedItems,
      isDarkMode,
      language
    }));
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [hearts, completedRoutines, unlockedItems, isDarkMode, language]);

  const addHearts = (amount: number) => setHearts(prev => prev + amount);
  const completeRoutine = (routineId: string) => {
    setCompletedRoutines(prev => {
      if (!prev.includes(routineId)) {
        return [...prev, routineId];
      }
      return prev;
    });
  };
  const unlockItem = (itemId: string) => {
    setUnlockedItems(prev => {
      if (!prev.includes(itemId)) {
        return [...prev, itemId];
      }
      return prev;
    });
  };
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleLanguage = () => setLanguage(prev => prev === 'pt' ? 'en' : 'pt');

  return (
    <GameContext.Provider value={{
      hearts, completedRoutines, unlockedItems, isDarkMode, language,
      addHearts, completeRoutine, unlockItem, toggleDarkMode, toggleLanguage
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
