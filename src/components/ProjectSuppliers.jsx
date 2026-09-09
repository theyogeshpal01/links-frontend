import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Plus, Edit, Link as LinkIcon, Copy, X } from 'lucide-react';
import api from '../api';

function ProjectSuppliers() {
  const { id } = useParams();
  const [suppliers, setSuppliers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  const [formData, setFormData] = useState({
    companyId: '',
    successUrl: '',
    disqualifiedUrl: '',
    quotaFullUrl: '',
    securityTerminateUrl: '',
    cpc: '0'
  });

  useEffect(() => {
    fetchSuppliers();
    fetchCompanies();
  }, [id]);

  const fetchSuppliers = async () => {
    try {
      const res = await api.get(`/admin/projects/${id}/suppliers`);
      setSuppliers(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/admin/companies');
      // Assume companies with type Vendor or all companies can be suppliers
      setCompanies(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!formData.companyId) return alert('Please select a Vendor/Company.');
    if (!formData.successUrl || !formData.disqualifiedUrl || !formData.quotaFullUrl || !formData.securityTerminateUrl) {
      return alert('Please provide all 4 Postback URLs (Success, Disqualified, Quota Full, Security Terminate).');
    }
    
    try {
      await api.post(`/admin/projects/${id}/suppliers`, formData);
      setShowAddModal(false);
      setFormData({ companyId: '', successUrl: '', disqualifiedUrl: '', quotaFullUrl: '', securityTerminateUrl: '', cpc: '0' });
      fetchSuppliers();
    } catch (e) {
      console.error(e);
      alert('Failed to add supplier: ' + (e.response?.data?.message || e.message));
    }
  };

  const getEntryLink = (supplier) => {
    return `${window.location.protocol}//${window.location.hostname}:5000/api/v1/router/entry/${id}/${supplier.companyId?._id}?pid=[PID]`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="bg-white p-6 relative">
            {/* Header controls */}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <div className="flex space-x-2">
                    <button className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-3 py-1.5 rounded text-sm font-bold flex items-center shadow-sm" onClick={() => {
            if(suppliers.length === 0) return alert('No suppliers to download.');
            let csv = "data:text/csv;charset=utf-8,Supplier,EntryLink\n";
            suppliers.forEach(s => {
               csv += `${s.companyId?.name || 'Unknown'},${getEntryLink(s)}\n`;
            });
            const encodedUri = encodeURI(csv);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "supplier_links.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>
            <Download size={14} className="mr-1" /> Supplier Links
          </button>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1.5 rounded text-sm font-bold flex items-center shadow-sm" onClick={() => setShowAddModal(true)}>
            <Plus size={14} className="mr-1" /> Add Supplier
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <div>
          <select className="border p-1 rounded mr-1"><option>25</option></select> entries per page
        </div>
        <div>
          Search: <input type="text" className="border p-1 rounded ml-1" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-t text-gray-700 bg-gray-50">
              <th className="p-3 font-bold whitespace-nowrap">ID <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">Panel <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">Hits <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">Completed <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">Dis Qualified <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">Quota Full <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">Security Term <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">IR <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">CPC <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">Last Completed <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap">Status <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap text-center">Action <span>&#9830;</span></th>
              <th className="p-3 font-bold whitespace-nowrap text-center">Test Links <span>&#9830;</span></th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s._id} className="border-b hover:bg-gray-50">
                <td className="p-3 whitespace-nowrap">{s._id.substring(s._id.length - 5)}</td>
                <td className="p-3 whitespace-nowrap">{s.companyId?.name || 'Unknown'}</td>
                <td className="p-3 text-blue-500 whitespace-nowrap">{s.hits || 0}/99999</td>
                <td className="p-3 text-blue-500 whitespace-nowrap">{s.completed || 0}/500</td>
                <td className="p-3 text-blue-500 whitespace-nowrap text-center">{s.disqualified || 0}</td>
                <td className="p-3 text-blue-500 whitespace-nowrap text-center">{s.quotaFull || 0}</td>
                <td className="p-3 text-blue-500 whitespace-nowrap text-center">{s.securityTerminate || 0}</td>
                <td className="p-3 text-red-500 whitespace-nowrap text-center">0%</td>
                <td className="p-3 whitespace-nowrap">{s.cpc}</td>
                <td className="p-3 whitespace-nowrap">-</td>
                <td className="p-3 text-blue-500 whitespace-nowrap">{s.status || 'Running'}</td>
                <td className="p-3 text-center whitespace-nowrap">
                  <span className="text-gray-500 cursor-pointer mr-2 inline-block hover:text-gray-800"><Edit size={14} /></span>
                  <span className="text-blue-500 cursor-pointer inline-block hover:text-blue-700" onClick={() => { setSelectedSupplierId(s); setShowLinksModal(true); }}><LinkIcon size={14} /></span>
                </td>
                <td className="p-3 text-center whitespace-nowrap">
                  <span className="text-red-500 cursor-pointer inline-block hover:text-red-700" onClick={() => copyToClipboard(getEntryLink(s))}><Copy size={14} /></span>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr><td colSpan="13" className="p-4 text-center text-gray-500">No suppliers assigned yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-600 font-medium">
        Showing {suppliers.length > 0 ? 1 : 0} to {suppliers.length} of {suppliers.length} entries
      </div>

      {/* Add Supplier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Assign Supplier</h3>
              <X className="cursor-pointer" onClick={() => setShowAddModal(false)} />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Vendor / Company</label>
                <select className="w-full border p-2 rounded" value={formData.companyId} onChange={e => setFormData({...formData, companyId: e.target.value})}>
                  <option value="">Please Select</option>
                  {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-green-600">Success Postback URL</label>
                  <input type="text" className="w-full border p-2 rounded text-xs" placeholder="https://vendor.com/return?status=success&pid=[PID]" value={formData.successUrl} onChange={e => setFormData({...formData, successUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-orange-500">Disqualified Postback URL</label>
                  <input type="text" className="w-full border p-2 rounded text-xs" placeholder="https://vendor.com/return?status=dq&pid=[PID]" value={formData.disqualifiedUrl} onChange={e => setFormData({...formData, disqualifiedUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-yellow-600">Quota Full Postback URL</label>
                  <input type="text" className="w-full border p-2 rounded text-xs" placeholder="https://vendor.com/return?status=qf&pid=[PID]" value={formData.quotaFullUrl} onChange={e => setFormData({...formData, quotaFullUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-red-500">Security Terminate Postback URL</label>
                  <input type="text" className="w-full border p-2 rounded text-xs" placeholder="https://vendor.com/return?status=sec&pid=[PID]" value={formData.securityTerminateUrl} onChange={e => setFormData({...formData, securityTerminateUrl: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CPC ($)</label>
                <input type="number" step="0.01" className="w-full border p-2 rounded" value={formData.cpc} onChange={e => setFormData({...formData, cpc: e.target.value})} />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold" onClick={handleSave}>Save Supplier</button>
            </div>
          </div>
        </div>
      )}

      {/* Show Links Modal */}
      {showLinksModal && selectedSupplierId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Supplier Tracking Links</h3>
              <X className="cursor-pointer" onClick={() => setShowLinksModal(false)} />
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <p className="font-bold text-blue-800 mb-2">Send this Entry Link to {selectedSupplierId.companyId?.name}:</p>
                <code className="text-xs break-all bg-white p-2 block border rounded">{getEntryLink(selectedSupplierId)}</code>
                <p className="text-xs text-gray-500 mt-2">They must replace [PID] with their own unique panelist ID dynamically.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProjectSuppliers;



