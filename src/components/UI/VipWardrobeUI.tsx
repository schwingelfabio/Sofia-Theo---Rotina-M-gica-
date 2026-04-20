import React from 'react';
import { useWorldStore } from '../../state/useWorldStore';

export const VipWardrobeUI: React.FC = () => {
    const { userProfile } = useWorldStore();
    const canAccess = userProfile.isVip || (userProfile.trialStartDate && (new Date().getTime() - userProfile.trialStartDate.getTime()) < 3 * 24 * 60 * 60 * 1000);

    if (!canAccess) return null;

    return (
        <div className="absolute right-8 top-1/4 z-20 bg-white/10 backdrop-blur-xl p-6 rounded-[32px] border border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.3)] animate-float">
            <h2 className="font-black text-xl mb-6 text-white tracking-widest uppercase flex items-center gap-2">
                <span className="text-2xl">⚡</span> SPATIAL WARDROBE
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <button className="bg-white/5 hover:bg-white/20 border border-white/10 p-4 rounded-2xl transition-all text-white font-bold text-xs">HERO (NEON)</button>
                <button className="bg-white/5 hover:bg-white/20 border border-white/10 p-4 rounded-2xl transition-all text-white font-bold text-xs">PRINCESS (GLASS)</button>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-tighter">Status: Active Interface</p>
            </div>
        </div>
    );
};
