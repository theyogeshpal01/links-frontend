import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import api from '../api';

function ProjectQuota() {
  const { id } = useParams();
  const [quotas, setQuotas] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [showAddForm, setShowAddForm] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    quota: '',
    qualificationId: '',
    questionFieldType: 'Range'
  });

  useEffect(() => {
    fetchQuotas();
    fetchQualifications();
  }, [id]);

  const fetchQuotas = async () => {
    try {
      const res = await api.get(`/admin/projects/${id}/quotas`);
      setQuotas(res.data);
    } catch(e) { console.error(e); }
  };

  const fetchQualifications = async () => {
    try {
      const res = await api.get(`/admin/projects/${id}/qualifications`);
      setQualifications(res.data);
    } catch(e) { console.error(e); }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.quota) return alert('Enter Quota Name and Quota value');
    try {
      await api.post(`/admin/projects/${id}/quotas`, formData);
      setFormData({ name: '', quota: '', qualificationId: '', questionFieldType: 'Range' });
      fetchQuotas();
    } catch(e) { console.error(e); alert('Failed to save quota'); }
  };

  const handleDelete = async (quotaId) => {
    if(!window.confirm('Delete quota?')) return;
    try {
      await api.delete(`/admin/quotas/${quotaId}`);
      fetchQuotas();
    } catch(e) { console.error(e); }
  };

  return (
    <div className="bg-white p-4">
      {showAddForm && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Add Quota</h2>
          <div className="border-b pb-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Quota Name</label>
                <input type="text" className="w-full border p-2 rounded text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Quota</label>
                <input type="number" className="w-full border p-2 rounded text-sm" value={formData.quota} onChange={e => setFormData({...formData, quota: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Primary Qualification</label>
                <select className="w-full border p-2 rounded text-sm" value={formData.qualificationId} onChange={e => setFormData({...formData, qualificationId: e.target.value})}>
                  <option value="">Please Select</option>
                  {qualifications.map(q => (
                    <option key={q._id} value={q._id}>{q.customQuestionName || q.questionType}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Question Field Type</label>
                <select className="w-full border p-2 rounded text-sm bg-gray-50" value={formData.questionFieldType} disabled>
                  <option value="Range">Range</option>
                  <option value="Dropdown">Dropdown</option>
                  <option value="Radio">Radio</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={handleSave} className="bg-blue-600 text-white font-bold px-6 py-1.5 rounded flex items-center text-sm shadow hover:bg-blue-700">
                <span className="mr-1">&#128190;</span> Save
              </button>
              <button onClick={() => setFormData({name:'', quota:'', qualificationId:'', questionFieldType:'Range'})} className="px-6 py-1.5 text-red-500 border border-red-200 rounded font-bold hover:bg-red-50 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto"><table className="w-full text-left border-collapse text-sm min-w-[600px]">
        <thead>
          <tr className="border-b text-gray-700 bg-gray-50">
            <th className="p-4 font-semibold">Quota Name</th>
            <th className="p-4 font-semibold">Quota</th>
            <th className="p-4 font-semibold">Total Remaining</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {quotas.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-red-500 bg-[#f4f4f4] border-b">
                No quota added
              </td>
            </tr>
          ) : (
            quotas.map(q => (
              <tr key={q._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{q.name}</td>
                <td className="p-4">{q.quota}</td>
                <td className="p-4">{q.quota}</td>
                <td className="p-4 text-green-600 font-bold">Active</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(q._id)} className="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table></div>
    </div>
  );
}

export default ProjectQuota;



