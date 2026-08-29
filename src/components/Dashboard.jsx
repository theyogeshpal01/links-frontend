import React from 'react';
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
      <h2 className="text-xl font-bold text-gray-700">Today's Project Statistics</h2>
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
    </div>
  );
}

export default Dashboard;
