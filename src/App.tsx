import React from 'react';
import { GameProvider } from './state/GameContext';
import { AuthProvider } from './state/AuthContext';
import { MetaverseHub } from './components/MetaverseHub';

function AppContent() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex flex-col">
      {/* 
         O MetaverseHub agora é a Viewport 3D principal.
         Não há mais listas, cabeçalhos 2D ou containers de texto fixos.
         A UI é Espacial (Spatial UI) renderizada dentro da cena 3D ou sobreposta holograficamente.
      */}
      <MetaverseHub />
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
