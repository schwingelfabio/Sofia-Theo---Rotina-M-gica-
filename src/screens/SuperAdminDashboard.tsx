import React, { useState } from 'react';
import { AnalyticsViewer } from '../components/AnalyticsViewer';
import { jsPDF } from 'jspdf';
import { LayoutDashboard, Users, MapPin, Activity, FileText, Settings, ShieldAlert, BrainCircuit, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockData = [
  { name: 'Seg', focus: 65, motor: 70 },
  { name: 'Ter', focus: 75, motor: 80 },
  { name: 'Qua', focus: 60, motor: 65 },
  { name: 'Qui', focus: 90, motor: 95 },
  { name: 'Sex', focus: 85, motor: 90 },
];

const MetricCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex items-center gap-4">
        <div className={`p-4 rounded-full ${color} bg-opacity-20`}>
            <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
        <div>
            <p className="text-slate-400 text-sm font-bold uppercase">{title}</p>
            <p className="text-3xl font-black text-white">{value}</p>
        </div>
    </div>
);

export const SuperAdminDashboard: React.FC = () => {
    // ... rest of the logic ...
    
    // Add inside return:
    // <div className="grid grid-cols-3 gap-6">
    //    <MetricCard title="Focus Index" value="88%" icon={BrainCircuit} color="text-indigo-400 bg-indigo-900" />
    //    <MetricCard title="Motor Accuracy" value="92%" icon={Activity} color="text-emerald-400 bg-emerald-900" />
    //    <MetricCard title="Sensory Load" value="Normal" icon={HeartPulse} color="text-amber-400 bg-amber-900" />
    // </div>
    // ... charts ...
  const [activeTab, setActiveTab] = useState('overview');

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Clinical Progress Report: Sofia & Theo Neuro-Sync", 10, 10);
    doc.text("Generated on: " + new Date().toLocaleString(), 10, 20);
    doc.text("Predictive Index: 88% Stable", 10, 30);
    doc.save("Clinical_Report.pdf");
  };

  const navItems = [
    { id: 'overview', name: 'Mission Control', icon: LayoutDashboard },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'heatmaps', name: 'Sensory Friction Maps', icon: MapPin },
    { id: 'analytics', name: 'Predictive Analytics', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex p-6 gap-6 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 rounded-3xl p-6 flex flex-col gap-8 shadow-2xl border border-slate-800">
        <h1 className="text-2xl font-black text-[#00A0A0]">COMMAND CENTER</h1>
        <nav className="flex flex-col gap-4">
          {navItems.map(item => (
            <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-colors ${activeTab === item.id ? 'bg-[#008080] text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                <item.icon size={20} />
                {item.name}
            </button>
          ))}
        </nav>
        <button 
            onClick={generateReport}
            className="mt-auto bg-slate-800 flex items-center justify-center gap-2 p-4 rounded-xl text-slate-200 font-bold hover:bg-slate-700">
            <FileText size={20} /> Generate PDF
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6">
        <header className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-3xl font-black">Admin Insights</h2>
          <div className="bg-red-950 text-red-400 px-4 py-2 rounded-full font-bold flex items-center gap-2">
            <ShieldAlert size={16} /> 3 System Critical Alerts
          </div>
        </header>

        <section className="flex-1 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-inner">
          {activeTab === 'overview' && (
            <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                   <MetricCard title="Focus Index" value="88%" icon={BrainCircuit} color="bg-indigo-900 text-indigo-400" />
                   <MetricCard title="Motor Accuracy" value="92%" icon={Activity} color="bg-emerald-900 text-emerald-400" />
                   <MetricCard title="Sensory Load" value="Normal" icon={HeartPulse} color="bg-amber-900 text-amber-400" />
                </div>
                
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 h-80">
                    <h3 className="text-xl font-bold mb-4 text-slate-300">Cognitive & Motor Telemetry</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155'}} />
                            <Line type="monotone" dataKey="focus" stroke="#818cf8" strokeWidth={3} />
                            <Line type="monotone" dataKey="motor" stroke="#34d399" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                    <h3 className="text-xl font-bold mb-4 text-slate-300">AI Clinical Recommendations</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-indigo-950/30 border border-indigo-900/50 rounded-2xl">
                            <p className="text-indigo-200">Professor IA: "Sofia showed high precision with block mechanics. Suggest introducing complex puzzles tomorrow."</p>
                        </div>
                        <div className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-2xl">
                            <p className="text-amber-200">Médico IA: "Theo teve aumento de frequência cardíaca no Conecta-Parque. Monitorar sensibilidade auditiva."</p>
                        </div>
                    </div>
                </div>
            </div>
          )}
          {activeTab !== 'overview' && (
            <div className="text-center p-20 text-slate-500 font-bold">
                Module {activeTab.toUpperCase()} In Active Development
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
