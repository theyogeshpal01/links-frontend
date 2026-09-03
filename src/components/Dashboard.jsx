import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Cloud, CloudOff, CloudLightning, ShieldAlert, Ban } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const TRAFFIC_COLORS = {
  Redirected: '#3b82f6', // blue
  Completed: '#22c55e', // green
  Rejected: '#ef4444', // red
  Quotafull: '#eab308', // yellow
};

const clientCompletesData = [
  { name: 'Asia Monitor', value: 200 },
  { name: 'Simple Junction', value: 40 },
  { name: 'Multinational', value: 10 },
  { name: 'Epitome', value: 5 },
];

const trafficData = [
  { name: 'Asia Monitor', Redirected: 400, Completed: 200, Rejected: 50, Quotafull: 100 },
  { name: 'Simple Junction', Redirected: 100, Completed: 40, Rejected: 200, Quotafull: 300 },
  { name: 'Market Resonance', Redirected: 350, Completed: 50, Rejected: 100, Quotafull: 50 },
  { name: 'Epitome', Redirected: 200, Completed: 50, Rejected: 40, Quotafull: 10 },
  { name: 'Data Xing', Redirected: 450, Completed: 20, Rejected: 10, Quotafull: 5 },
];

const supplierCompletesData = [
  { name: 'Cint', value: 72 },
  { name: 'Toluna', value: 15 },
  { name: 'Dynata', value: 8 },
  { name: 'PureSpectrum', value: 5 },
];

const pmCompletesData = [
  { name: 'Sudhanshu', value: 65 },
  { name: 'Niharika', value: 25 },
  { name: 'Suhasini', value: 10 },
];

function TimeFilters() {
  return (
    <div className="flex space-x-2 mb-6">
      <button className="px-4 py-1.5 text-xs font-bold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">1 Day</button>
      <button className="px-4 py-1.5 text-xs font-bold text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">1 Week</button>
      <button className="px-4 py-1.5 text-xs font-bold text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">1 Month</button>
      <button className="px-4 py-1.5 text-xs font-bold text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">3 Months</button>
    </div>
  );
}

function StatRow({ icon, value, label, colorText, colorIcon, bgFull }) {
  if (bgFull) {
    return (
      <div className={`flex flex-col items-center justify-center py-5 ${bgFull} text-white`}>
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-full p-2">{icon}</div>
          <span className="text-2xl font-extrabold">{value}</span>
        </div>
        <span className="text-xs mt-2 uppercase tracking-widest font-semibold opacity-90">{label}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-5 border-b border-gray-100 last:border-0 bg-white hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full bg-gray-50 ${colorIcon}`}>{icon}</div>
        <span className="text-2xl font-extrabold text-gray-800">{value}</span>
      </div>
      <span className="text-xs mt-2 text-gray-500 uppercase tracking-widest font-semibold">{label}</span>
    </div>
  );
}

function ProgressBar({ label, percentage, ratio, colorClass }) {
  return (
    <div className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-baseline mb-3">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className={`font-bold text-lg ${colorClass}`}>{percentage}</span>
      </div>
      <div className="w-full bg-gray-200 h-2.5 rounded-full mb-2">
        <div className={`h-2.5 rounded-full bg-current ${colorClass} transition-all duration-500`} style={{ width: percentage }}></div>
      </div>
      <span className="text-xs text-gray-500 font-medium tracking-wide">{ratio}</span>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* Top Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><CloudLightning className="mr-2 text-blue-500" /> Today's Project Statistics</h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Vertical Stats Card */}
          <div className="w-full lg:w-72 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <StatRow icon={<Cloud size={24} />} value="246" label="Completed" colorIcon="text-green-500" />
            <StatRow icon={<Cloud size={24} />} value="844" label="Disqualified" colorIcon="text-yellow-500" />
            <StatRow icon={<Cloud size={24} />} value="138" label="Quotafull" colorIcon="text-purple-500" />
            <StatRow icon={<CloudOff size={24} />} value="627" label="Security Term" colorIcon="text-red-500" />
            <StatRow icon={<Ban size={24} />} value="132" label="Blocked" bgFull="bg-gradient-to-r from-red-600 to-red-700" />
          </div>

          {/* Right side stats */}
          <div className="flex-1 flex flex-col gap-6">
             {/* Status Banner */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap justify-around text-center divide-x divide-gray-100">
              <div className="px-6 w-1/2 sm:w-auto mb-4 sm:mb-0"><p className="text-blue-500 font-black text-3xl mb-1">1151</p><p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Running</p></div>
              <div className="px-6 w-1/2 sm:w-auto mb-4 sm:mb-0"><p className="text-orange-400 font-black text-3xl mb-1">7</p><p className="text-xs text-gray-500 font-bold uppercase tracking-wide">On Hold</p></div>
              <div className="px-6 w-1/3 sm:w-auto"><p className="text-yellow-500 font-black text-3xl mb-1">13</p><p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Awaiting Ids</p></div>
              <div className="px-6 w-1/3 sm:w-auto"><p className="text-green-500 font-black text-3xl mb-1">38</p><p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Completed</p></div>
              <div className="px-6 w-1/3 sm:w-auto"><p className="text-red-500 font-black text-3xl mb-1">325</p><p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Closed</p></div>
            </div>

            {/* Monthly Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
               <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center"><ShieldAlert size={18} className="mr-2 text-indigo-500" /> Monthly Statistics</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-auto">
                 <ProgressBar label="Completed" percentage="3.83%" ratio="2570/67031" colorClass="text-green-500" />
                 <ProgressBar label="Disqualified" percentage="28.94%" ratio="20120/67031" colorClass="text-yellow-500" />
                 <ProgressBar label="Quotafull" percentage="6.2%" ratio="4170/67031" colorClass="text-blue-500" />
                 <ProgressBar label="Security Term" percentage="21.04%" ratio="14100/67031" colorClass="text-red-500" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Charts */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">Country Charts</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-96 flex flex-col relative">
          <TimeFilters />
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <p className="text-gray-400 font-medium">[ Interactive World Map Placeholder ]</p>
          </div>
        </div>
      </div>

      {/* Client Charts */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">Client Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
            <h3 className="text-base font-bold text-gray-700 mb-4">Top 5 Clients By Completes</h3>
            <TimeFilters />
            <p className="text-xs text-gray-400 font-medium mb-4 tracking-wide uppercase">Today Data</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientCompletesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{fontSize: 11, fill: '#6B7280'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 11, fill: '#6B7280'}} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
            <h3 className="text-base font-bold text-gray-700 mb-4">Top 5 Clients Traffic Analysis</h3>
            <TimeFilters />
            <p className="text-xs text-gray-400 font-medium mb-4 tracking-wide uppercase">Today Data</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} layout="vertical" stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" tick={{fontSize: 11, fill: '#6B7280'}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 11, fill: '#6B7280'}} width={110} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Redirected" stackId="a" fill={TRAFFIC_COLORS.Redirected} radius={[4, 0, 0, 4]} />
                  <Bar dataKey="Completed" stackId="a" fill={TRAFFIC_COLORS.Completed} />
                  <Bar dataKey="Rejected" stackId="a" fill={TRAFFIC_COLORS.Rejected} />
                  <Bar dataKey="Quotafull" stackId="a" fill={TRAFFIC_COLORS.Quotafull} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Supplier Charts */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">Supplier Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
            <h3 className="text-base font-bold text-gray-700 mb-4">Top 5 Suppliers By Completes</h3>
            <TimeFilters />
            <p className="text-xs text-gray-400 font-medium mb-4 tracking-wide uppercase">Today Data</p>
            <div className="h-64 flex">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={supplierCompletesData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} fill="#8884d8" dataKey="value" stroke="none">
                    {supplierCompletesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" wrapperStyle={{ fontSize: '11px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
            <h3 className="text-base font-bold text-gray-700 mb-4">Top 5 Supplier Traffic Analysis</h3>
            <TimeFilters />
            <p className="text-xs text-gray-400 font-medium mb-4 tracking-wide uppercase">Today Data</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} layout="vertical" stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" tick={{fontSize: 11, fill: '#6B7280'}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 11, fill: '#6B7280'}} width={110} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Redirected" stackId="a" fill={TRAFFIC_COLORS.Redirected} radius={[4, 0, 0, 4]} />
                  <Bar dataKey="Completed" stackId="a" fill={TRAFFIC_COLORS.Completed} />
                  <Bar dataKey="Rejected" stackId="a" fill={TRAFFIC_COLORS.Rejected} />
                  <Bar dataKey="Quotafull" stackId="a" fill={TRAFFIC_COLORS.Quotafull} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* PM Charts */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">PM Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
            <h3 className="text-base font-bold text-gray-700 mb-4">Top PM By Completes</h3>
            <TimeFilters />
            <p className="text-xs text-gray-400 font-medium mb-4 tracking-wide uppercase">Today Data</p>
            <div className="h-64 flex">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pmCompletesData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} fill="#8884d8" dataKey="value" stroke="none">
                    {pmCompletesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" wrapperStyle={{ fontSize: '11px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
            <h3 className="text-base font-bold text-gray-700 mb-4">Top 5 PM Traffic Analysis</h3>
            <TimeFilters />
            <p className="text-xs text-gray-400 font-medium mb-4 tracking-wide uppercase">Today Data</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} layout="vertical" stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" tick={{fontSize: 11, fill: '#6B7280'}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 11, fill: '#6B7280'}} width={110} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Redirected" stackId="a" fill={TRAFFIC_COLORS.Redirected} radius={[4, 0, 0, 4]} />
                  <Bar dataKey="Completed" stackId="a" fill={TRAFFIC_COLORS.Completed} />
                  <Bar dataKey="Rejected" stackId="a" fill={TRAFFIC_COLORS.Rejected} />
                  <Bar dataKey="Quotafull" stackId="a" fill={TRAFFIC_COLORS.Quotafull} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
