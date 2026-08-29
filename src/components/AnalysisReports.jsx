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

function AnalysisReports() {
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
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Reports Console</h1>
      </div>

      {/* Reports Toggle Bar */}
      <div className="flex space-x-2">
        <div className="relative group">
           <button onClick={() => setActiveTab('summary')} className={`px-4 py-2 text-sm font-medium rounded border ${activeTab === 'summary' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
              Summary Reports ▾
           </button>
           {/* Dropdown can go here if needed later based on user screenshot */}
        </div>
        
        <div className="relative group">
           <button onClick={() => setActiveTab('detailed')} className={`px-4 py-2 text-sm font-medium rounded border ${activeTab === 'detailed' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
              Detailed Reports ▾
           </button>
        </div>
        
        <button className="px-4 py-2 text-sm font-medium rounded border bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100">
           Download ▾
        </button>
      </div>

      {/* Filters Area (Mock) */}
      <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-md border">
         <select className="border p-2 rounded text-sm w-48">
            <option>Client Performance Report</option>
         </select>
         <select className="border p-2 rounded text-sm w-32">
            <option>For Year 2026</option>
         </select>
         <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">Search</button>
      </div>

      {activeTab === 'summary' ? (
        <div className="space-y-6 mt-4">
           <h2 className="text-xl font-bold text-gray-800">Today's Total</h2>
           <div className="grid grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 border border-green-500 rounded-lg shadow-sm text-2xl font-medium">Completed {stats.completes}</div>
              <div className="bg-white p-6 border border-yellow-400 rounded-lg shadow-sm text-2xl font-medium">Disqualified {stats.disqualified}</div>
              <div className="bg-white p-6 border border-blue-400 rounded-lg shadow-sm text-2xl font-medium">Quotafull {stats.quotaFull}</div>
              <div className="bg-white p-6 border border-red-500 rounded-lg shadow-sm text-2xl font-medium">Security Term {stats.securityTerm}</div>
           </div>

           <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg border shadow-sm p-4">
                 <h3 className="text-lg font-bold mb-4 bg-gray-50 p-2 border-b">Top 10 Project Manager</h3>
                 <table className="w-full text-left text-sm">
                    <thead><tr className="border-b text-gray-500"><th className="pb-2">Project Manager</th><th className="pb-2 text-right">Completed</th></tr></thead>
                    <tbody><tr className="border-b"><td className="py-2">Sudhanshu Kumar</td><td className="text-right font-medium">39</td></tr><tr><td className="py-2">Niharika Tiwari</td><td className="text-right font-medium">12</td></tr></tbody>
                 </table>
              </div>
              <div className="bg-white rounded-lg border shadow-sm p-4">
                 <h3 className="text-lg font-bold mb-4 bg-gray-50 p-2 border-b">Top 10 Sale Manager</h3>
                 <table className="w-full text-left text-sm">
                    <thead><tr className="border-b text-gray-500"><th className="pb-2">Sales Manager</th><th className="pb-2 text-right">Completed</th></tr></thead>
                    <tbody><tr className="border-b"><td className="py-2">Sales TTP</td><td className="text-right font-medium">51</td></tr></tbody>
                 </table>
              </div>
              <div className="bg-white rounded-lg border shadow-sm p-4">
                 <h3 className="text-lg font-bold mb-4 bg-gray-50 p-2 border-b">Top 10 Clients</h3>
                 <table className="w-full text-left text-sm">
                    <thead><tr className="border-b text-gray-500"><th className="pb-2">Client</th><th className="pb-2 text-right">Completed</th></tr></thead>
                    <tbody><tr className="border-b"><td className="py-2">Epitome</td><td className="text-right font-medium">25</td></tr><tr className="border-b"><td className="py-2">Asia Monitor</td><td className="text-right font-medium">17</td></tr><tr className="border-b"><td className="py-2">Data Xing</td><td className="text-right font-medium">5</td></tr></tbody>
                 </table>
              </div>
              <div className="bg-white rounded-lg border shadow-sm p-4">
                 <h3 className="text-lg font-bold mb-4 bg-gray-50 p-2 border-b">Top 10 Vendors</h3>
                 <table className="w-full text-left text-sm">
                    <thead><tr className="border-b text-gray-500"><th className="pb-2">Vendor</th><th className="pb-2 text-right">Completed</th></tr></thead>
                    <tbody><tr className="border-b"><td className="py-2">Fantasy</td><td className="text-right font-medium">17</td></tr><tr className="border-b"><td className="py-2">Internal Company</td><td className="text-right font-medium">10</td></tr><tr className="border-b"><td className="py-2">Yahu</td><td className="text-right font-medium">8</td></tr></tbody>
                 </table>
              </div>
           </div>
        </div>
      ) : (
        <div className="space-y-6 mt-4">
           <h2 className="text-xl font-bold text-gray-800">Detailed Analytics</h2>
           <p className="text-gray-500">Select a report from the dropdown above to view detailed data.</p>
           {/* Detailed report tables will go here */}
        </div>
      )}
    </div>
  );
}

export default AnalysisReports;
