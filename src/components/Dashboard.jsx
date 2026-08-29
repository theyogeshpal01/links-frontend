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
    <div className="flex space-x-2 mb-4">
      <button className="px-3 py-1 text-xs font-semibold bg-gray-500 text-white rounded">1 Day</button>
      <button className="px-3 py-1 text-xs font-semibold bg-gray-500 text-white rounded">1 Week</button>
      <button className="px-3 py-1 text-xs font-semibold bg-gray-500 text-white rounded">1 Month</button>
      <button className="px-3 py-1 text-xs font-semibold bg-gray-500 text-white rounded">3 Months</button>
    </div>
  );
}

function StatRow({ icon, value, label, colorText, colorIcon, bgFull }) {
  if (bgFull) {
    return (
      <div className={`flex flex-col items-center justify-center py-4 ${bgFull} text-white`}>
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-full p-1 text-red-700">{icon}</div>
          <span className="text-xl font-bold">{value}</span>
        </div>
        <span className="text-xs mt-1 uppercase tracking-wider opacity-90">{label}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-4 border-b last:border-0 bg-white">
      <div className="flex items-center space-x-2">
        <div className={`p-1 ${colorIcon}`}>{icon}</div>
        <span className="text-xl font-bold text-gray-800">{value}</span>
      </div>
      <span className="text-xs mt-1 text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function ProgressBar({ label, percentage, ratio, colorClass }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline space-x-2 mb-2">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className={`font-bold ${colorClass}`}>{percentage}</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full mb-1">
        <div className={`h-2 rounded-full bg-current ${colorClass}`} style={{ width: percentage }}></div>
      </div>
      <span className="text-xs text-gray-500 font-medium">{ratio}</span>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Top Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-4">Today's Project Statistics</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Vertical Stats Card */}
          <div className="w-full md:w-64 flex flex-col bg-white rounded-lg shadow overflow-hidden">
            <StatRow icon={<Cloud size={20} />} value="246" label="Completed" colorIcon="text-green-500" />
            <StatRow icon={<Cloud size={20} />} value="844" label="Disqualified" colorIcon="text-yellow-500" />
            <StatRow icon={<Cloud size={20} />} value="138" label="Quotafull" colorIcon="text-purple-500" />
            <StatRow icon={<CloudOff size={20} />} value="627" label="Security Term" colorIcon="text-red-500" />
            <StatRow icon={<Ban size={20} />} value="132" label="Blocked" bgFull="bg-red-700" />
          </div>

          {/* Map / Main visual area placeholder (Since screenshot shows map full width, we'll stack it) */}
          <div className="flex-1 flex flex-col justify-end gap-6">
             <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap justify-around text-center divide-x divide-gray-200">
              <div className="px-4 w-1/2 sm:w-auto mb-2 sm:mb-0"><p className="text-green-500 font-bold text-lg">1151</p><p className="text-xs text-gray-500 font-semibold">Running</p></div>
              <div className="px-4 w-1/2 sm:w-auto mb-2 sm:mb-0"><p className="text-orange-500 font-bold text-lg">7</p><p className="text-xs text-gray-500 font-semibold">On Hold</p></div>
              <div className="px-4 w-1/3 sm:w-auto"><p className="text-yellow-600 font-bold text-lg">13</p><p className="text-xs text-gray-500 font-semibold">Awaiting Ids</p></div>
              <div className="px-4 w-1/3 sm:w-auto"><p className="text-green-600 font-bold text-lg">38</p><p className="text-xs text-gray-500 font-semibold">Completed</p></div>
              <div className="px-4 w-1/3 sm:w-auto"><p className="text-red-600 font-bold text-lg">325</p><p className="text-xs text-gray-500 font-semibold">Closed</p></div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
               <h2 className="text-lg font-bold text-gray-700 mb-6">Monthly Statistics</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                 <ProgressBar label="Completed" percentage="3.83%" ratio="2570/67031" colorClass="text-green-500" />
                 <ProgressBar label="DisQualified" percentage="28.94%" ratio="20120/67031" colorClass="text-yellow-500" />
                 <ProgressBar label="Quotafull" percentage="6.2%" ratio="4170/67031" colorClass="text-blue-500" />
                 <ProgressBar label="Security Term" percentage="21.04%" ratio="14100/67031" colorClass="text-red-500" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Charts */}
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-4">Country Charts</h2>
        <div className="bg-white rounded-lg shadow p-6 h-96 flex flex-col relative">
          <TimeFilters />
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded bg-gray-50">
            <p className="text-gray-400 font-medium">[ Interactive World Map Placeholder ]</p>
          </div>
        </div>
      </div>

      {/* Client Charts */}
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-4">Client Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-bold text-gray-600 mb-4">Top 5 Clients By Completes</h3>
            <TimeFilters />
            <p className="text-xs text-gray-500 mb-2">Today Data</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientCompletesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 10}} />
                  <YAxis tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#84cc16" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-bold text-gray-600 mb-4">Top 5 Clients Traffic Analysis</h3>
            <TimeFilters />
            <p className="text-xs text-gray-500 mb-2">Today Data</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} layout="vertical" stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{fontSize: 10}} />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 10}} width={100} />
                  <RechartsTooltip />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="Redirected" stackId="a" fill={TRAFFIC_COLORS.Redirected} />
                  <Bar dataKey="Completed" stackId="a" fill={TRAFFIC_COLORS.Completed} />
                  <Bar dataKey="Rejected" stackId="a" fill={TRAFFIC_COLORS.Rejected} />
                  <Bar dataKey="Quotafull" stackId="a" fill={TRAFFIC_COLORS.Quotafull} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Supplier Charts */}
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-4">Supplier Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-bold text-gray-600 mb-4">Top 5 Suppliers By Completes</h3>
            <TimeFilters />
            <p className="text-xs text-gray-500 mb-2">Today Data</p>
            <div className="h-64 flex">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={supplierCompletesData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({percent}) => `${(percent * 100).toFixed(0)}%`}>
                    {supplierCompletesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '10px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-bold text-gray-600 mb-4">Top 5 Supplier Traffic Analysis</h3>
            <TimeFilters />
            <p className="text-xs text-gray-500 mb-2">Today Data</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} layout="vertical" stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{fontSize: 10}} />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 10}} width={100} />
                  <RechartsTooltip />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="Redirected" stackId="a" fill={TRAFFIC_COLORS.Redirected} />
                  <Bar dataKey="Completed" stackId="a" fill={TRAFFIC_COLORS.Completed} />
                  <Bar dataKey="Rejected" stackId="a" fill={TRAFFIC_COLORS.Rejected} />
                  <Bar dataKey="Quotafull" stackId="a" fill={TRAFFIC_COLORS.Quotafull} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* PM Charts */}
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-4">PM Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-bold text-gray-600 mb-4">Top PM By Completes</h3>
            <TimeFilters />
            <p className="text-xs text-gray-500 mb-2">Today Data</p>
            <div className="h-64 flex">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pmCompletesData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({percent}) => `${(percent * 100).toFixed(0)}%`}>
                    {pmCompletesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '10px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-bold text-gray-600 mb-4">Top 5 PM Traffic Analysis</h3>
            <TimeFilters />
            <p className="text-xs text-gray-500 mb-2">Today Data</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} layout="vertical" stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{fontSize: 10}} />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 10}} width={100} />
                  <RechartsTooltip />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="Redirected" stackId="a" fill={TRAFFIC_COLORS.Redirected} />
                  <Bar dataKey="Completed" stackId="a" fill={TRAFFIC_COLORS.Completed} />
                  <Bar dataKey="Rejected" stackId="a" fill={TRAFFIC_COLORS.Rejected} />
                  <Bar dataKey="Quotafull" stackId="a" fill={TRAFFIC_COLORS.Quotafull} />
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
