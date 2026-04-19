import React, { useState } from 'react';
import { AnalyticsViewer } from '../components/AnalyticsViewer';
import { jsPDF } from 'jspdf';
import { LayoutDashboard, Users, MapPin, Activity, FileText, Settings, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export const SuperAdminDashboard: React.FC = () => {
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
                <AnalyticsViewer />
                {/* Add more widgets here: Global Map placeholder, predictive gauges */}
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
