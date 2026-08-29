import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Save } from 'lucide-react';
import api from '../api';

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)",
  "Costa Rica","Croatia","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador",
  "Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar",
  "Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia",
  "Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal",
  "Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan",
  "Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino",
  "Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia",
  "Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden",
  "Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago",
  "Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

function Contacts() {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactTypes, setContactTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const emptyForm = {
    contactTypeId: '', companyId: '', salutation: '', firstName: '', middleName: '',
    lastName: '', gender: '', dateOfBirth: '', email: '', contactNo: '',
    address: '', city: '', zipCode: '', country: '', state: '', status: 'Active'
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchContacts();
    fetchContactTypes();
    fetchCompanies();
  }, []);

  const fetchContacts = async () => {
    try { const res = await api.get('/admin/contacts'); setContacts(res.data); }
    catch(err) { console.error(err); }
  };

  const fetchContactTypes = async () => {
    try { const res = await api.get('/admin/contact-types'); setContactTypes(res.data); }
    catch(err) { console.error(err); }
  };

  const fetchCompanies = async () => {
    try { const res = await api.get('/admin/companies'); setCompanies(res.data); }
    catch(err) { console.error(err); }
  };

  const handleSave = async () => {
    if (!form.firstName) return alert('First Name is required');
    if (!form.email) return alert('Email Address is required');
    try {
      await api.post('/admin/contacts', form);
      setForm(emptyForm);
      setShowForm(false);
      fetchContacts();
    } catch(err) {
      alert(err.response?.data?.message || err.message || 'Failed to save contact');
    }
  };

  const confirmDelete = (id) => { setDeleteId(id); setShowDeleteModal(true); };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/contacts/${deleteId}`);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchContacts();
    } catch(err) { alert('Error deleting contact'); }
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const filtered = contacts.filter(c =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">{showForm ? 'Add Contact' : 'Contact List'}</h2>
        {!showForm && (
          <button onClick={() => { setForm(emptyForm); setShowForm(true); }} className="bg-gray-800 text-white px-3 py-1.5 text-sm rounded shadow-sm hover:bg-gray-700">
            + New Contact
          </button>
        )}
      </div>

      {showForm ? (
        <form className="space-y-6 text-sm" onSubmit={e => e.preventDefault()}>
          {/* Row 1: Contact Type + Company */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-red-500 mb-1">Contact Type</label>
              <select className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.contactTypeId} onChange={e => set('contactTypeId', e.target.value)}>
                <option value="">Please Select</option>
                {contactTypes.map(ct => (
                  <option key={ct._id} value={ct._id}>{ct.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-red-500 mb-1">Company Name</label>
              <select className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.companyId} onChange={e => set('companyId', e.target.value)}>
                <option value="">Please Select</option>
                {companies.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <hr />

          {/* Row 2: Name fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">Contact Salutation</label>
              <input className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.salutation} onChange={e => set('salutation', e.target.value)} placeholder="Mr. / Ms. / Dr." />
            </div>
            <div>
              <label className="block text-red-500 mb-1">First Name</label>
              <input className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Middle Name</label>
              <input className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.middleName} onChange={e => set('middleName', e.target.value)} />
            </div>
            <div>
              <label className="block text-red-500 mb-1">Last Name</label>
              <input className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <select className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Date Of Birth</label>
              <input type="date" className="w-full border p-2 rounded text-gray-600 focus:outline-none focus:border-blue-500" value={form.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} />
            </div>
          </div>

          <hr />

          {/* Row 3: Contact details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-red-500 mb-1">Email Address</label>
              <input type="email" className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div>
              <label className="block text-red-500 mb-1">Contact No</label>
              <input className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.contactNo} onChange={e => set('contactNo', e.target.value)} />
            </div>
          </div>

          <hr />

          {/* Row 4: Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">Address</label>
              <input className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.address} onChange={e => set('address', e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.city} onChange={e => set('city', e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Zip Code</label>
              <input className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.zipCode} onChange={e => set('zipCode', e.target.value)} />
            </div>
            <div>
              <label className="block text-red-500 mb-1">Country</label>
              <select className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.country} onChange={e => set('country', e.target.value)}>
                <option value="">Please Select</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-red-500 mb-1">State</label>
              <input className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.state} onChange={e => set('state', e.target.value)} placeholder="Enter state" />
            </div>
          </div>

          <hr />

          <div className="w-1/3">
            <label className="block text-gray-700 mb-1">Status</label>
            <select className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <div className="flex space-x-2 pt-2">
            <button type="button" onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded font-medium flex items-center">
              <Save size={16} className="mr-2" /> Save
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-red-400 text-red-500 hover:bg-red-50 px-4 py-1.5 rounded font-medium">Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3 text-sm">
            <div><select className="border rounded px-2 py-1"><option>25</option></select> entries per page</div>
            <div className="flex items-center gap-2">Search: <input className="border rounded px-2 py-1" value={search} onChange={e => setSearch(e.target.value)} /></div>
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
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{c.firstName} {c.lastName}</td>
                    <td className="p-3">{c.contactTypeId?.name || 'N/A'}</td>
                    <td className="p-3">{c.companyId?.name || 'N/A'}</td>
                    <td className="p-3">{c.contactNo}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.country}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">{c.status}</span>
                    </td>
                    <td className="p-3">
                      <span className="cursor-pointer text-gray-400 hover:text-blue-500 mr-3 inline-flex items-center"><Edit size={16} /></span>
                      <span className="cursor-pointer text-gray-400 hover:text-red-500 inline-flex items-center" onClick={() => confirmDelete(c._id)}><Trash2 size={16} /></span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="p-4 text-center text-gray-400">No contacts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-blue-900/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this contact? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
