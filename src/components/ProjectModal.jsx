import React, { useState, useEffect } from 'react';
import api from '../api';
import { COUNTRIES } from '../utils/countries';
import { LANGUAGES } from '../utils/languages';

function ProjectModal({ onClose }) {
  // A massively simplified version of the modal for demonstration,
  // structurally mimicking the tabs and layout of the screenshots.
  const [activeTab, setActiveTab] = useState('Project');
  const [studyTypes, setStudyTypes] = useState([]);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const stRes = await api.get('/admin/study-types');
        setStudyTypes(stRes.data);
      } catch (e) {
        console.error("Error fetching study types", e);
      }
    };
    fetchConfigs();
  }, []);

  const tabs = ['Project', 'Qualification', 'Project Quota', 'Suppliers', 'Client Link', 'Reconcile', 'Download', 'Map Foreign IDs'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#f4f6f9] w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="bg-[#4b6cb7] text-white flex justify-between items-center px-4 py-2">
            <h3 className="font-bold">Project: (# 1308 :: P-0) <span className="underline">DXD-8556-test</span></h3>
            <button onClick={onClose} className="text-white hover:text-gray-200">✕</button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-600 text-white flex text-xs font-medium border-b border-gray-700 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`px-4 py-2 whitespace-nowrap ${activeTab === tab ? 'bg-blue-600' : 'hover:bg-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Modal Body Container */}
        <div className="flex flex-1 overflow-auto bg-gray-100 p-4">
          
          {/* Main Left Content */}
          <div className="flex-1 bg-white border rounded shadow-sm mr-4 p-4">
            <h4 className="font-bold text-gray-700 bg-gray-100 p-2 rounded mb-4">Setup Requirements</h4>
            
            <form className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Project Name</label>
                  <input className="w-full border p-1.5 rounded" value="DXD-8556-test" readOnly />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Parent Project</label>
                  <select className="w-full border p-1.5 rounded"><option>Self Parent</option></select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Study Type</label>
                  <select className="w-full border p-1.5 rounded">
                    <option value="">Select Study Type...</option>
                    {studyTypes.map(st => (
                      <option key={st._id} value={st._id}>{st.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Country</label>
                  <select className="w-full border p-1.5 rounded">
                    <option value="">Select Country...</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Language</label>
                  <select className="w-full border p-1.5 rounded">
                    <option value="">Select Language...</option>
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div><label className="block text-gray-600 mb-1">CPC $</label><input className="w-full border p-1.5 rounded" value="1.00" readOnly /></div>
                <div><label className="block text-gray-600 mb-1">Vendor Max CPC $</label><input className="w-full border p-1.5 rounded" value="0.40" readOnly /></div>
                <div>
                  <label className="block text-gray-600 mb-1">Invoice Currency</label>
                  <select className="w-full border p-1.5 rounded bg-white focus:outline-none focus:border-blue-500">
                    <option>US Dollar</option>
                    <option>Indian Rupee</option>
                    <option>EURO</option>
                    <option>Pound Sterling</option>
                  </select>
                </div>
                <div><label className="block text-gray-600 mb-1">Conversion Rate</label><input className="w-full border p-1.5 rounded" value="1.00" readOnly /></div>
              </div>

              {/* Links section */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-2 rounded">
                 <div>
                    <label className="block font-medium mb-1">Survey Friendly Name</label>
                    <input className="w-full border p-1.5 rounded" placeholder="(Project Name For Panel Members)" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block font-medium mb-1">PV $</label>
                        <input className="w-full border p-1.5 rounded" value="0.00" readOnly />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Setup Cost $</label>
                        <input className="w-full border p-1.5 rounded" value="0.00" readOnly />
                    </div>
                 </div>
              </div>

              <div>
                  <h4 className="font-bold text-gray-700 bg-gray-100 p-2 rounded mt-6 mb-4">Expected Metrics & Data</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-gray-600 mb-1">Req. Completes</label><input className="w-full border p-1.5 rounded" defaultValue="400"/></div>
                    <div><label className="block text-gray-600 mb-1">Max. Completes</label><select className="w-full border p-1.5 rounded"><option>No Max Limit</option></select></div>
                  </div>
              </div>
            </form>
          </div>

          {/* Right Sidebar Stats & Security */}
          <div className="w-72 flex flex-col space-y-4">
             {/* Security Panel */}
             <div className="bg-white border rounded shadow-sm p-4 text-xs">
                <h4 className="font-bold text-gray-700 border-b pb-2 mb-2">Basic Security</h4>
                <div className="flex justify-between items-center mb-1">
                   <span className="text-green-600">Validate Blank Referrer</span> <input type="checkbox" />
                </div>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-blue-600">Validate Panelist ID</span> <input type="checkbox" defaultChecked />
                </div>
                <h5 className="font-bold text-blue-600 flex justify-between">veritasIdentity <span className="text-green-500 font-normal">$ Billed Monthly</span></h5>
                <div className="flex justify-between items-center mt-1"><span className="text-gray-600">Device Validation</span> <input type="checkbox" /></div>
                <div className="flex justify-between items-center mt-1"><span className="text-gray-600">Geographic Validation</span> <input type="checkbox" /></div>
             </div>

             {/* Live Statistics */}
             <div className="bg-white border rounded shadow-sm p-4 text-xs flex-1">
                 <h4 className="font-bold text-gray-700 border-b pb-2 mb-4">Statistics</h4>
                 <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div><p className="text-gray-500">Total Hits</p><p className="font-bold text-blue-500 text-lg">1</p></div>
                    <div><p className="text-gray-500">Redirects</p><p className="font-bold text-blue-500 text-lg">0</p></div>
                    <div><p className="text-gray-500">Blocked</p><p className="font-bold text-red-500 text-lg">0</p></div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4 text-center border-t pt-4">
                    <div><p className="text-gray-500">Completed</p><p className="font-bold text-green-500 text-lg">0</p></div>
                    <div><p className="text-gray-500">Disqualified</p><p className="font-bold text-orange-500 text-lg">0</p></div>
                    <div><p className="text-gray-500">Quota Full</p><p className="font-bold text-yellow-500 text-lg">0</p></div>
                    <div><p className="text-gray-500">Security</p><p className="font-bold text-red-500 text-lg">1</p></div>
                 </div>
                 <div className="grid grid-cols-3 gap-2 border-t pt-4 text-center text-[10px] text-gray-500">
                    <div><p>EPC</p><p className="font-bold text-gray-700">$0</p></div>
                    <div><p>CR</p><p className="font-bold text-gray-700">0%</p></div>
                    <div><p>IR</p><p className="font-bold text-gray-700">0%</p></div>
                 </div>
             </div>
          </div>
          
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-white border-t p-3 flex space-x-2">
           <button className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-600">Update</button>
           <button className="bg-teal-500 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-teal-600">Clone</button>
           <button onClick={onClose} className="border border-red-300 text-red-500 px-4 py-1.5 rounded text-sm font-medium hover:bg-red-50">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
