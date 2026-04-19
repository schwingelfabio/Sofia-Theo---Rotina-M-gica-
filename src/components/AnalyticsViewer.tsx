import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../state/AuthContext';
import { BarChart3 } from 'lucide-react';

export const AnalyticsViewer: React.FC = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState<any[]>([]);
    
    useEffect(() => {
        if (!user) return;
        
        const fetchLogs = async () => {
            const logsRef = collection(db, 'users', user.uid, 'analytics');
            const q = query(logsRef, orderBy('timestamp', 'desc'));
            const logsSnap = await getDocs(q);
            setLogs(logsSnap.docs.map(doc => doc.data()));
        };
        fetchLogs();
    }, [user]);

    return (
        <div className="bg-slate-800 text-slate-100 p-6 rounded-[32px] border-2 border-slate-700 mt-6 shadow-xl">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <BarChart3 /> Painel Admin: Telemetria (Logs)
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-2 text-xs font-mono">
                {logs.map((log, i) => (
                    <div key={i} className="bg-slate-700/50 p-2 rounded">
                        [{new Date(log.timestamp?.seconds * 1000).toLocaleTimeString()}] Evento: <strong>{log.event}</strong> | Zona: {log.zone}
                    </div>
                ))}
            </div>
        </div>
    );
};
