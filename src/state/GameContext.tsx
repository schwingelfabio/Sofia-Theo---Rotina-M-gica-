import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface CharacterCustomization {
  outfit: string;
  accessory: string;
}

interface GameState {
  hearts: number;
  completedRoutines: string[];
  unlockedItems: string[];
  isDarkMode: boolean;
  language: 'pt' | 'en';
  activeCharacter: 'sofia' | 'theo';
  customization: { sofia: CharacterCustomization, theo: CharacterCustomization };
  addHearts: (amount: number) => void;
  completeRoutine: (routineId: string) => void;
  unlockItem: (itemId: string) => void;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  setActiveCharacter: (character: 'sofia' | 'theo') => void;
  setCustomization: (character: 'sofia' | 'theo', type: 'outfit' | 'accessory', value: string) => void;
}

const defaultCustomization = {
  sofia: { outfit: 'casual', accessory: 'none' },
  theo: { outfit: 'casual', accessory: 'none' }
};

const defaultState: GameState = {
  hearts: 0,
  completedRoutines: [],
  unlockedItems: [],
  isDarkMode: false,
  language: 'pt',
  activeCharacter: 'sofia',
  customization: defaultCustomization,
  addHearts: () => {},
  completeRoutine: () => {},
  unlockItem: () => {},
  toggleDarkMode: () => {},
  toggleLanguage: () => {},
  setActiveCharacter: () => {},
  setCustomization: () => {},
};

const GameContext = createContext<GameState>(defaultState);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [hearts, setHearts] = useState(0);
  const [completedRoutines, setCompletedRoutines] = useState<string[]>([]);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [activeCharacter, setActiveCharacter] = useState<'sofia' | 'theo'>('sofia');
  const [customization, setCustomizationState] = useState<{ sofia: CharacterCustomization, theo: CharacterCustomization }>(defaultCustomization);
  
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Load from LocalStorage OR Firebase
  useEffect(() => {
    let unsubscribe = () => {};
    const loadState = async () => {
      if (authLoading) return;

      if (user) {
        // Load from Firebase
        const progressRef = doc(db, 'users', user.uid, 'progress', 'main');
        const progressSnap = await getDoc(progressRef);
        if (progressSnap.exists()) {
          const data = progressSnap.data();
          setHearts(data.hearts || 0);
          setCompletedRoutines(data.completedRoutines || []);
          setLanguage(data.language || 'pt');
          setActiveCharacter(data.activeCharacter || 'sofia');
          if (data.customization) setCustomizationState(data.customization);
        } else {
          // Create initial progress doc
          await setDoc(progressRef, {
            hearts: 0,
            completedRoutines: [],
            language: 'pt',
            activeCharacter: 'sofia',
            customization: defaultCustomization,
            updatedAt: serverTimestamp()
          });
        }
      } else {
        // Load from Local Storage as fallback
        const saved = localStorage.getItem('sofiaTheoGameState');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.hearts) setHearts(parsed.hearts);
            if (parsed.completedRoutines) setCompletedRoutines(parsed.completedRoutines);
            if (parsed.unlockedItems) setUnlockedItems(parsed.unlockedItems);
            if (parsed.isDarkMode !== undefined) setIsDarkMode(parsed.isDarkMode);
            if (parsed.language !== undefined) setLanguage(parsed.language);
            if (parsed.activeCharacter !== undefined) setActiveCharacter(parsed.activeCharacter);
            if (parsed.customization !== undefined) setCustomizationState(parsed.customization);
          } catch (e) {
            console.error('Failed to load game state', e);
          }
        }
      }
      setInitialLoadDone(true);
    };

    loadState();
    return () => unsubscribe();
  }, [user, authLoading]);

  // Save to localStorage AND/OR Firebase
  useEffect(() => {
    if (!initialLoadDone) return;

    // Dark mode logic
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const stateToSave = {
      hearts,
      completedRoutines,
      unlockedItems,
      isDarkMode,
      language,
      activeCharacter,
      customization
    };

    // Save locally always
    localStorage.setItem('sofiaTheoGameState', JSON.stringify(stateToSave));

    // Save to Firebase
    if (user) {
      const saveToFirebase = async () => {
        try {
          const progressRef = doc(db, 'users', user.uid, 'progress', 'main');
          await updateDoc(progressRef, {
            hearts,
            completedRoutines,
            language,
            activeCharacter,
            customization,
            updatedAt: serverTimestamp()
          });
        } catch (error) {
          console.error("Error syncing to Firebase:", error);
        }
      };
      
      // Debounce saving slightly? Or just save directly since React groups calls
      const timeout = setTimeout(() => {
        saveToFirebase();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [hearts, completedRoutines, unlockedItems, isDarkMode, language, activeCharacter, customization, user, initialLoadDone]);

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
  
  const setCustomization = (character: 'sofia' | 'theo', type: 'outfit' | 'accessory', value: string) => {
    setCustomizationState(prev => ({
      ...prev,
      [character]: {
        ...prev[character],
        [type]: value
      }
    }));
  };

  return (
    <GameContext.Provider value={{
      hearts, completedRoutines, unlockedItems, isDarkMode, language, activeCharacter, customization,
      addHearts, completeRoutine, unlockItem, toggleDarkMode, toggleLanguage, setActiveCharacter, setCustomization
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
