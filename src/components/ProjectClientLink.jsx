import React from 'react';
import { Save, Trash2 } from 'lucide-react';

function ProjectClientLink() {
  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Import Unique Links</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-0 mb-8 text-center text-white">
        <div className="bg-[#b3d4df] p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Total Client Codes</h3>
          <p className="text-2xl font-bold text-white">0</p>
        </div>
        <div className="bg-[#ff6b5a] p-6 shadow-sm">
          <h3 className="text-2xl font-bold mb-2 text-gray-800">Used Client Codes</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-[#78bfa1] p-6 shadow-sm relative">
          <h3 className="text-2xl font-bold mb-2 text-gray-800">Remaining Client Codes</h3>
          <div className="flex justify-center items-center">
             <p className="text-2xl font-bold mr-2">0</p>
             <Trash2 size={20} className="text-red-500 cursor-pointer hover:text-red-700" />
          </div>
        </div>
      </div>

      {/* Upload Controls */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Select File :</label>
        <div className="flex items-center space-x-4">
          <div className="flex border rounded overflow-hidden">
            <label className="bg-gray-100 px-4 py-1.5 border-r cursor-pointer text-sm hover:bg-gray-200">
                Choose file
                <input type="file" className="hidden" />
            </label>
            <span className="px-4 py-1.5 text-sm text-gray-500 bg-white">No file chosen</span>
          </div>
          <button className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center shadow-sm">
            <Save size={16} className="mr-2" /> Import
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border text-gray-600 bg-white">
              <th className="p-3 border-r font-normal">TTPID</th>
              <th className="p-3 border-r font-normal">Vendor Name</th>
              <th className="p-3 border-r font-normal">Started</th>
              <th className="p-3 border-r font-normal">Completed On</th>
              <th className="p-3 border-r font-normal">PanelList ID</th>
              <th className="p-3 font-normal">Client Code</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td colSpan="5" className="p-3 text-center font-bold text-gray-800 border-r">
                No Client Code is Used
              </td>
              <td className="p-3 bg-gray-50"></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ProjectClientLink;
