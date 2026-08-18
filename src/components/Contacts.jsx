import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Save, Plus } from 'lucide-react';
import api from '../api';

function Contacts() {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/admin/contacts');
      setContacts(res.data);
    } catch(err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await api.delete(`/admin/contacts/${id}`);
        fetchContacts();
      } catch(err) { alert('Error deleting contact'); }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">{showForm ? 'Add Contact' : 'Contact List'}</h2>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="bg-gray-800 text-white px-3 py-1.5 text-sm rounded shadow-sm hover:bg-gray-700">
            + New Contact
          </button>
        )}
      </div>

      {showForm ? (
        <form className="space-y-6 text-sm">
           <div className="grid grid-cols-3 gap-6">
              <div><label className="block text-red-500 mb-1">Contact Type</label><select className="w-full border p-2 rounded"><option>Please Select</option></select></div>
              <div><label className="block text-red-500 mb-1">Company Name</label><select className="w-full border p-2 rounded"><option>Please Select</option></select></div>
           </div>
           
           <hr className="my-4"/>
           
           <div className="grid grid-cols-3 gap-6">
              <div><label className="block text-gray-700 mb-1">Contact Saluation</label><input className="w-full border p-2 rounded" /></div>
              <div><label className="block text-red-500 mb-1">First Name</label><input className="w-full border p-2 rounded" /></div>
              <div><label className="block text-gray-700 mb-1">Middle Name</label><input className="w-full border p-2 rounded" /></div>
              <div><label className="block text-red-500 mb-1">Last Name</label><input className="w-full border p-2 rounded" /></div>
              <div><label className="block text-gray-700 mb-1">Gender :</label><select className="w-full border p-2 rounded"><option>Select Gender</option></select></div>
              <div><label className="block text-gray-700 mb-1">Date Of Birth</label><input type="date" className="w-full border p-2 rounded text-gray-500" /></div>
           </div>

           <hr className="my-4"/>

           <div className="grid grid-cols-3 gap-6">
              <div><label className="block text-red-500 mb-1">Email Address</label><input className="w-full border p-2 rounded" /></div>
              <div><label className="block text-red-500 mb-1">Contact No</label><input className="w-full border p-2 rounded" /></div>
           </div>

           <hr className="my-4"/>

           <div className="grid grid-cols-3 gap-6">
              <div><label className="block text-gray-700 mb-1">Address</label><input className="w-full border p-2 rounded" /></div>
              <div><label className="block text-gray-700 mb-1">City</label><input className="w-full border p-2 rounded" /></div>
              <div><label className="block text-gray-700 mb-1">Zip Code</label><input className="w-full border p-2 rounded" /></div>
              <div><label className="block text-red-500 mb-1">Country</label><select className="w-full border p-2 rounded"><option>Please Select</option></select></div>
              <div><label className="block text-red-500 mb-1">State</label><select className="w-full border p-2 rounded"><option>Please Select</option></select></div>
           </div>

           <hr className="my-4"/>
           
           <div className="w-1/3">
               <label className="block text-gray-400 mb-1">Status</label>
               <div className="border p-2 rounded bg-gray-50 text-gray-700">Active</div>
           </div>

           <div className="flex space-x-2 pt-4">
              <button type="button" className="bg-blue-400 text-white px-4 py-1.5 rounded font-medium flex items-center">
                 <Save size={16} className="mr-2" /> Save
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-red-400 text-red-500 px-4 py-1.5 rounded font-medium">Cancel</button>
           </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3 text-sm">
            <div><select className="border rounded px-2 py-1"><option>25</option></select> entries per page</div>
            <div>Search: <input className="border rounded px-2 py-1" /></div>
          </div>

          <div className="overflow-x-auto border rounded">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-gray-50 border-b text-gray-600">
                <tr>
                  <th className="p-3 font-semibold">Contact Name</th>
                  <th className="p-3 font-semibold">Contact Type</th>
                  <th className="p-3 font-semibold">Company Name</th>
                  <th className="p-3 font-semibold">Contact No</th>
                  <th className="p-3 font-semibold">Email</th>
                  <th className="p-3 font-semibold">Country</th>
                  <th className="p-3 font-semibold">Username</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{c.firstName} {c.lastName}</td>
                    <td className="p-3">{c.contactTypeId?.name || 'N/A'}</td>
                    <td className="p-3">{c.companyId?.name || 'N/A'}</td>
                    <td className="p-3">{c.contactNo}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.country}</td>
                    <td className="p-3">Admin TTP</td>
                    <td className="p-3 text-blue-500 cursor-pointer">{c.status}</td>
                    <td className="p-3 text-gray-400">
                      <span className="cursor-pointer text-gray-400 hover:text-blue-500 mr-3 inline-flex items-center"><Edit size={16} /></span>
                      <span className="cursor-pointer text-gray-400 hover:text-red-500 inline-flex items-center" onClick={() => handleDelete(c._id)}><Trash2 size={16} /></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Contacts;
