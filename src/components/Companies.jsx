import React, { useState, useEffect } from 'react';
import api from '../api';
import { Edit, Trash2, X } from 'lucide-react';
import { COUNTRIES } from '../utils/countries';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    companyType: 'Client',
    status: 'Active',
    country: '',
    email: '',
    contactPerson: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/companies');
      setCompanies(res.data);
    } catch(err) { console.error(err); }
  };

  const handleSave = async () => {
    try {
      await api.post('/admin/companies', formData);
      setShowAddModal(false);
      setFormData({ name: '', companyType: 'Client', status: 'Active', country: '', email: '', contactPerson: '' });
      fetchData();
    } catch(err) {
      console.error(err);
      alert('Failed to save company.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Company List</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-gray-800 text-white px-3 py-1.5 text-sm rounded shadow-sm hover:bg-gray-700"
        >
          + New Company
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-4 border border-gray-200 p-3 rounded">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Country :</label>
          <select className="border rounded px-2 py-1 text-sm min-w-[150px]"><option>Please Select</option></select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Company Type :</label>
          <select className="border rounded px-2 py-1 text-sm min-w-[150px]"><option>Company Type</option></select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Approve Status :</label>
          <select className="border rounded px-2 py-1 text-sm min-w-[150px]"><option>Select Status</option></select>
        </div>
        <div className="flex space-x-2 mt-4">
            <button className="bg-blue-400 text-white px-4 py-1 text-sm rounded">Submit</button>
            <button className="border border-gray-300 text-gray-600 px-4 py-1 text-sm rounded">↻ Reset</button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-gray-100 border-b text-gray-600">
            <tr>
              <th className="p-2 font-semibold">Company Name</th>
              <th className="p-2 font-semibold">Type</th>
              <th className="p-2 font-semibold">Contact Person</th>
              <th className="p-2 font-semibold">Email</th>
              <th className="p-2 font-semibold">Country</th>
              <th className="p-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.companyType}</td>
                <td className="p-2">{c.contactPerson}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.country}</td>
                <td className="p-2 text-blue-500">{c.status}</td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">No companies found. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Register New Company</h3>
              <X className="cursor-pointer text-gray-500 hover:text-black" onClick={() => setShowAddModal(false)} />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input type="text" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Type</label>
                  <select className="w-full border p-2 rounded" value={formData.companyType} onChange={e => setFormData({...formData, companyType: e.target.value})}>
                    <option value="Client">Client</option>
                    <option value="Vendor">Vendor (Supplier)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select className="w-full border p-2 rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <select className="w-full border p-2 rounded" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}>
                  <option value="">Select Country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Person</label>
                <input type="text" className="w-full border p-2 rounded" value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600 shadow" onClick={handleSave}>Save Company</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Companies;
