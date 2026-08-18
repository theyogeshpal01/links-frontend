import React, { useState } from 'react';
import { Cloud, CloudOff, CloudLightning, ShieldAlert, Ban } from 'lucide-react';

function StatCard({ title, value, icon, color, bg }) {
  return (
    <div className={`bg-white rounded-lg p-4 flex items-center border-l-4 ${color} shadow-sm`}>
      <div className={`p-3 rounded-full mr-4 ${bg}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 text-xs font-semibold uppercase">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('summary');
  const stats = {
    completes: 51,
    disqualified: 554,
    quotaFull: 87,
    securityTerm: 760,
    blocked: 497,
    running: 862,
    onHold: 8,
    awaiting: 14,
    completedProjects: 36,
    closed: 288
  };

  return (
    <div className="space-y-6">
      
      {/* Reports Toggle Bar */}
      <div className="flex space-x-2">
        <button onClick={() => setActiveTab('summary')} className={`px-4 py-2 text-sm font-medium rounded ${activeTab === 'summary' ? 'bg-[#e58a9e] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Summary Reports ▾</button>
        <button onClick={() => setActiveTab('detailed')} className={`px-4 py-2 text-sm font-medium rounded ${activeTab === 'detailed' ? 'bg-[#b6c669] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Detailed Reports ▾</button>
        <button className="px-4 py-2 text-sm font-medium rounded bg-[#fac986] text-gray-800 hover:bg-orange-300">Download IDs ▾</button>
      </div>

      {activeTab === 'summary' ? (
        <div className="space-y-6 mt-4">
           <h2 className="text-2xl text-center font-medium text-gray-800">Today's Total</h2>
           <div className="grid grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 border border-green-500 rounded-lg shadow-sm text-2xl font-medium">Completed {stats.completes}</div>
              <div className="bg-white p-6 border border-yellow-400 rounded-lg shadow-sm text-2xl font-medium">Disqualified {stats.disqualified}</div>
              <div className="bg-white p-6 border border-blue-400 rounded-lg shadow-sm text-2xl font-medium">Quotafull {stats.quotaFull}</div>
              <div className="bg-white p-6 border border-red-500 rounded-lg shadow-sm text-2xl font-medium">Security Term {stats.securityTerm}</div>
           </div>

           <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                 <h3 className="text-xl font-medium mb-4">Top 10 Project Manager</h3>
                 <table className="w-full text-left text-sm">
                    <thead><tr className="border-b"><th className="pb-2">Project Manager</th><th className="pb-2">Completed</th></tr></thead>
                    <tbody><tr className="border-b"><td className="py-2">Sudhanshu Kumar</td><td>39</td></tr><tr><td className="py-2">Niharika Tiwari</td><td>12</td></tr></tbody>
                 </table>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                 <h3 className="text-xl font-medium mb-4">Top 10 Sale Manager</h3>
                 <table className="w-full text-left text-sm">
                    <thead><tr className="border-b"><th className="pb-2">Sales Manager</th><th className="pb-2">Completed</th></tr></thead>
                    <tbody><tr className="border-b"><td className="py-2">Sales TTP</td><td>51</td></tr></tbody>
                 </table>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                 <h3 className="text-xl font-medium mb-4">Top 10 Clients</h3>
                 <table className="w-full text-left text-sm">
                    <thead><tr className="border-b"><th className="pb-2">Client</th><th className="pb-2">Completed</th></tr></thead>
                    <tbody><tr className="border-b"><td className="py-2">Epitome</td><td>25</td></tr><tr className="border-b"><td className="py-2">Asia Monitor</td><td>17</td></tr><tr className="border-b"><td className="py-2">Data Xing</td><td>5</td></tr></tbody>
                 </table>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                 <h3 className="text-xl font-medium mb-4">Top 10 Vendors</h3>
                 <table className="w-full text-left text-sm">
                    <thead><tr className="border-b"><th className="pb-2">Vendor</th><th className="pb-2">Completed</th></tr></thead>
                    <tbody><tr className="border-b"><td className="py-2">Fantasy</td><td>17</td></tr><tr className="border-b"><td className="py-2">Internal Company</td><td>10</td></tr><tr className="border-b"><td className="py-2">Yahu</td><td>8</td></tr></tbody>
                 </table>
              </div>
           </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold text-gray-700">Today's Project Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <StatCard title="Completed" value={stats.completes} icon={<Cloud className="text-green-500" size={24}/>} color="border-green-500" bg="bg-green-50" />
            <StatCard title="Disqualified" value={stats.disqualified} icon={<CloudOff className="text-yellow-500" size={24}/>} color="border-yellow-500" bg="bg-yellow-50" />
            <StatCard title="Quota Full" value={stats.quotaFull} icon={<CloudLightning className="text-purple-500" size={24}/>} color="border-purple-500" bg="bg-purple-50" />
            <StatCard title="Security Term" value={stats.securityTerm} icon={<ShieldAlert className="text-red-500" size={24}/>} color="border-red-500" bg="bg-red-50" />
            <StatCard title="Blocked" value={stats.blocked} icon={<Ban className="text-white" size={24}/>} color="border-red-700" bg="bg-red-700/20" />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-around text-center divide-x">
            <div className="px-4"><p className="text-green-500 font-bold text-xl">{stats.running}</p><p className="text-xs text-gray-500 font-semibold">Running</p></div>
            <div className="px-4"><p className="text-orange-500 font-bold text-xl">{stats.onHold}</p><p className="text-xs text-gray-500 font-semibold">On Hold</p></div>
            <div className="px-4"><p className="text-yellow-600 font-bold text-xl">{stats.awaiting}</p><p className="text-xs text-gray-500 font-semibold">Awaiting IDs</p></div>
            <div className="px-4"><p className="text-green-600 font-bold text-xl">{stats.completedProjects}</p><p className="text-xs text-gray-500 font-semibold">Completed</p></div>
            <div className="px-4"><p className="text-red-600 font-bold text-xl">{stats.closed}</p><p className="text-xs text-gray-500 font-semibold">Closed</p></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
