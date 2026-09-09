import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Save, Trash2 } from 'lucide-react';
import api from '../api';

function ProjectClientLink() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [codes, setCodes] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    fetchCodes();
  }, [id]);

  const fetchCodes = async () => {
    try {
      const res = await api.get(`/admin/projects/${id}/client-codes`);
      setCodes(res.data);
    } catch(e) { console.error(e); }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file) return alert('Please select a file first.');
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setIsImporting(true);
        const text = e.target.result;
        // Basic split by newline or comma
        const rawCodes = text.split(/\r?\n|,/).map(c => c.trim()).filter(c => c);
        
        if (rawCodes.length === 0) {
          alert('No valid codes found in file');
          setIsImporting(false);
          return;
        }

        await api.post(`/admin/projects/${id}/client-codes/import`, { codes: rawCodes });
        alert(`Successfully imported ${rawCodes.length} client codes.`);
        setFile(null);
        fetchCodes();
      } catch (err) {
        console.error(err);
        alert('Failed to import codes');
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsText(file);
  };

  const totalCodes = codes.length;
  const usedCodes = codes.filter(c => c.isUsed).length;
  const remainingCodes = totalCodes - usedCodes;

  return (
    <div className="bg-white p-4 min-h-[500px]">
      <h2 className="text-xl text-gray-800 mb-4">Import Unique Links</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 mb-6 text-center">
        <div className="bg-[#b7d6e8] py-8 border-r border-white">
          <h3 className="text-xl text-gray-800 mb-2">Total Client Codes</h3>
          <p className="text-xl font-bold text-white">{totalCodes}</p>
        </div>
        <div className="bg-[#fb6340] py-8 border-r border-white">
          <h3 className="text-xl text-gray-800 mb-2">Used Client Codes</h3>
          <p className="text-xl font-bold text-white">{usedCodes}</p>
        </div>
        <div className="bg-[#66bb6a] py-8 relative">
          <h3 className="text-xl text-gray-800 mb-2">Remaining Client Codes</h3>
          <div className="flex justify-center items-center">
             <p className="text-xl font-bold text-white mr-2">{remainingCodes}</p>
             <Trash2 size={16} className="text-red-600 cursor-pointer hover:text-red-800" title="Clear unused" />
          </div>
        </div>
      </div>

      {/* Upload Controls */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Select File :</label>
        <div className="flex items-center space-x-2">
          <div className="flex border rounded overflow-hidden">
            <label className="bg-gray-50 px-3 py-1.5 border-r cursor-pointer text-sm hover:bg-gray-100 text-gray-700">
                Choose file
                <input type="file" accept=".txt,.csv" className="hidden" onChange={handleFileChange} />
            </label>
            <span className="px-3 py-1.5 text-sm text-gray-500 bg-white min-w-[150px]">
              {file ? file.name : 'No file chosen'}
            </span>
          </div>
          <button onClick={handleImport} disabled={isImporting} className="bg-[#4eb3f7] disabled:bg-blue-300 hover:bg-blue-400 text-white px-3 py-1.5 rounded text-sm font-bold flex items-center shadow-sm">
            <Save size={14} className="mr-1" /> {isImporting ? 'Importing...' : 'Import'}
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border text-gray-700 bg-white">
              <th className="p-3 border-r font-medium">TTPID</th>
              <th className="p-3 border-r font-medium">Vendor Name</th>
              <th className="p-3 border-r font-medium">Started</th>
              <th className="p-3 border-r font-medium">Completed On</th>
              <th className="p-3 border-r font-medium">PanelList ID</th>
              <th className="p-3 font-medium">Client Code</th>
            </tr>
          </thead>
          <tbody>
            {codes.length === 0 ? (
              <tr className="border">
                <td colSpan="5" className="p-3 text-center font-bold text-black border-r">
                  No Client Code is Used
                </td>
                <td className="p-3 bg-gray-50"></td>
              </tr>
            ) : (
              codes.map(c => (
                <tr key={c._id} className="border-b hover:bg-gray-50">
                  <td className="p-2 border-r">{c.ttpid || '-'}</td>
                  <td className="p-2 border-r">{c.vendorName || '-'}</td>
                  <td className="p-2 border-r">{c.started ? new Date(c.started).toLocaleString() : '-'}</td>
                  <td className="p-2 border-r">{c.completedOn ? new Date(c.completedOn).toLocaleString() : '-'}</td>
                  <td className="p-2 border-r">{c.panelListId || '-'}</td>
                  <td className="p-2 font-mono text-blue-600">{c.clientCode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectClientLink;


