import React from 'react';
import { useWorldStore } from '../../state/useWorldStore';

export const VipWardrobeUI: React.FC = () => {
    const { userProfile } = useWorldStore();
    const canAccess = userProfile.isVip || (userProfile.trialStartDate && (new Date().getTime() - userProfile.trialStartDate.getTime()) < 3 * 24 * 60 * 60 * 1000);

    if (!canAccess) return null;

    return (
        <div className="absolute right-4 top-20 z-20 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg mb-4 text-purple-600">👑 Guarda-Roupa Real</h2>
            <div className="grid grid-cols-2 gap-2">
                <button className="bg-blue-100 p-2 rounded">Herói (Azul)</button>
                <button className="bg-pink-100 p-2 rounded">Herói (Rosa)</button>
                <button className="bg-blue-100 p-2 rounded">Princesa (Azul)</button>
                <button className="bg-pink-100 p-2 rounded">Princesa (Rosa)</button>
            </div>
            <p className="mt-4 text-xs italic text-gray-500">Selecione para vestir!</p>
        </div>
    );
};
