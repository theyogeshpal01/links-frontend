import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import api from '../api';

function StudyTypes() {
  const [types, setTypes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const res = await api.get('/admin/study-types');
      setTypes(res.data);
    } catch(err) { console.error(err); }
  };

  const handleAdd = async () => {
    if (!newName) return alert('Please enter a name');
    try {
      if (editId) {
        await api.put(`/admin/study-types/${editId}`, { name: newName });
      } else {
        await api.post('/admin/study-types', { name: newName, order: types.length + 1 });
      }
      setNewName('');
      setEditId(null);
      setShowAddModal(false);
      fetchTypes();
    } catch(err) { 
      console.error('Error saving study type:', err); 
      alert(err.response?.data?.message || err.message || 'Failed to save study type');
    }
  };

  const openNewModal = () => {
    setNewName('');
    setEditId(null);
    setShowAddModal(true);
  };

  const openEditModal = (t) => {
    setNewName(t.name);
    setEditId(t._id);
    setShowAddModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/admin/study-types/${deleteId}`);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchTypes();
    } catch(err) { console.error('Error deleting study type'); }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">Study Type</h2>
        <button onClick={openNewModal} className="bg-gray-800 text-white px-3 py-1.5 text-sm rounded shadow-sm hover:bg-gray-700">
          + New Study Type
        </button>
      </div>

      <div className="flex justify-between items-center mb-3 text-sm">
        <div><select className="border rounded px-2 py-1"><option>25</option></select> entries per page</div>
        <div>Search: <input className="border rounded px-2 py-1" /></div>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b text-gray-600">
            <tr>
              <th className="p-3 font-semibold">Study Type</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Sort Order</th>
              <th className="p-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {types.map(t => (
              <tr key={t._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.name}</td>
                <td className="p-3 text-blue-500 cursor-pointer">{t.status}</td>
                <td className="p-3 text-blue-500">{t.order}</td>
                <td className="p-3 text-gray-400">
                  <span className="cursor-pointer text-gray-400 hover:text-blue-500 mr-3 inline-flex items-center" onClick={() => openEditModal(t)}><Edit size={16} /></span>
                  <span className="cursor-pointer text-gray-400 hover:text-red-500 inline-flex items-center" onClick={() => { setDeleteId(t._id); setShowDeleteModal(true); }}><Trash2 size={16} /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Stylish Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4 text-gray-800">{editId ? 'Edit Study Type' : 'Add New Study Type'}</h3>
            <input 
              type="text"  
              className="w-full border rounded p-2 mb-4 focus:outline-none focus:border-blue-500" 
              placeholder="e.g. Healthcare, B2B..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Stylish Delete Confirm Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyTypes;
