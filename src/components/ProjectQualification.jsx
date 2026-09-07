import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import api from '../api';

const PROFILE_QUESTIONS = [
  {
    id: "q1",
    question: "Please describe your role in manufacturing and industrial. I work in:",
    fieldType: "Dropdown",
    options: [
      "Furniture and fixture manufacturing",
      "Textiles and linens",
      "Building materials",
      "Food and Beverage production",
      "Consumer Electronics",
      "Cleaning and maintenance products",
      "Safety and security equipment",
      "Transportation equipment",
      "Technology and software development"
    ]
  },
  {
    id: "q2",
    question: "What is your Age?",
    fieldType: "Range",
    options: []
  },
  {
    id: "q3",
    question: "What is your Gender?",
    fieldType: "Radio",
    options: ["Male", "Female", "Other"]
  }
];

function ProjectQualification() {
  const { id } = useParams();
  const [qualifications, setQualifications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({
    profileQuestionId: '',
    questionFieldType: '',
    rangeStart: '',
    rangeEnd: '',
    selectedAnswers: [],
    questionType: 'Custom',
    customQuestionName: ''
  });
  
  const [tempOption, setTempOption] = useState('');

  useEffect(() => {
    fetchQualifications();
  }, [id]);

  const fetchQualifications = async () => {
    try {
      const res = await api.get(`/admin/projects/${id}/qualifications`);
      setQualifications(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    try {
      // Basic validation
      if (formData.questionType === 'Age' && (!formData.rangeStart || !formData.rangeEnd)) {
        return alert('Please enter start and end age.');
      }
      if ((formData.questionType === 'Gender' || formData.questionType === 'Custom') && formData.options.length === 0) {
        return alert('Please add at least one option.');
      }

      await api.post(`/admin/projects/${id}/qualifications`, formData);
      setShowAddModal(false);
      setFormData({ questionType: 'Age', rangeStart: '', rangeEnd: '', options: [], customQuestionName: '' });
      fetchQualifications();
    } catch (e) {
      console.error(e);
      alert('Failed to save qualification.');
    }
  };

  const handleDelete = async (qualId) => {
    if (!window.confirm('Delete this qualification?')) return;
    try {
      await api.delete(`/admin/qualifications/${qualId}`);
      fetchQualifications();
    } catch (e) {
      console.error(e);
    }
  };

  const addOption = () => {
    if (tempOption.trim() !== '') {
      setFormData(prev => ({ ...prev, options: [...prev.options, tempOption.trim()] }));
      setTempOption('');
    }
  };

  const removeOption = (indexToRemove) => {
    setFormData(prev => ({ ...prev, options: prev.options.filter((_, idx) => idx !== indexToRemove) }));
  };

  // Group qualifications by type for display
  const ageQuals = qualifications.filter(q => q.questionType === 'Age');
  const genderQuals = qualifications.filter(q => q.questionType === 'Gender');
  const customQuals = qualifications.filter(q => q.questionType === 'Custom');

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 pb-12 relative">
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Project Qualification</h1>
            <div className="flex space-x-2">
                <button onClick={() => { setFormData({...formData, questionType: 'Custom'}); setShowAddModal(true); }} className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center shadow-sm">
                    <Plus size={16} className="mr-1" /> Add Custom Qualification
                </button>
                <button onClick={() => { setFormData({...formData, questionType: 'Age'}); setShowAddModal(true); }} className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center shadow-sm">
                    <Plus size={16} className="mr-1" /> Add Qualification
                </button>
            </div>
        </div>

        <div className="space-y-6">
            
            {/* Age Qualification Table */}
            {ageQuals.length > 0 && (
            <div className="border border-gray-200 rounded overflow-hidden shadow-sm bg-white">
                <div className="bg-[#b3d4df] px-4 py-2 flex items-center">
                    <div className="flex items-center space-x-2 w-48 text-blue-600 font-bold text-sm">
                        <span className="border-b border-blue-600 pb-0.5">Active</span>
                    </div>
                    <div className="flex items-center text-sm font-bold text-gray-800">
                        What is your age? <span className="ml-2 bg-[#00c6ff] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Range</span>
                    </div>
                </div>
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-3 w-48">Status</th>
                            <th className="p-3 font-bold text-gray-600 w-16">Start</th>
                            <th className="p-3 font-bold text-gray-600 w-16">End</th>
                            <th className="p-3 font-bold text-gray-600 w-24">Valid?</th>
                            <th className="p-3 font-bold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ageQuals.map(q => (
                            <tr key={q._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 text-blue-500 font-medium">Active</td>
                                <td className="p-3 text-blue-500 font-bold">{q.rangeStart}</td>
                                <td className="p-3 text-blue-500 font-bold">{q.rangeEnd}</td>
                                <td className="p-3 text-blue-500">1</td>
                                <td className="p-3 text-right">
                                    <button onClick={() => handleDelete(q._id)} className="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded"><Trash2 size={14}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}

            {/* Gender Qualification Table */}
            {genderQuals.length > 0 && (
            <div className="border border-gray-200 rounded overflow-hidden shadow-sm bg-white">
                <div className="bg-[#b3d4df] px-4 py-2 flex items-center">
                    <div className="flex items-center space-x-2 w-48 text-blue-600 font-bold text-sm">
                        <span className="border-b border-blue-600 pb-0.5">Active</span>
                    </div>
                    <div className="flex items-center text-sm font-bold text-gray-800">
                        What is your gender? <span className="ml-2 bg-[#00c6ff] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Dropdown</span>
                    </div>
                </div>
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-3 w-48">Status</th>
                            <th className="p-3 font-bold text-gray-600">Option Text</th>
                            <th className="p-3 font-bold text-gray-600 w-24">Valid?</th>
                            <th className="p-3 font-bold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genderQuals.map(q => (
                            <React.Fragment key={q._id}>
                                {q.options.map((opt, i) => (
                                    <tr key={`${q._id}-${i}`} className="border-b hover:bg-gray-50">
                                        <td className="p-3 text-blue-500 font-medium">Active</td>
                                        <td className="p-3 font-bold text-gray-700">{opt}</td>
                                        <td className="p-3 text-blue-500">1</td>
                                        <td className="p-3 text-right">
                                            {i === 0 && <button onClick={() => handleDelete(q._id)} className="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded" title="Delete entire rule"><Trash2 size={14}/></button>}
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            )}

            {/* Custom Qualifications */}
            {customQuals.map(q => (
                <div key={q._id} className="border border-gray-200 rounded overflow-hidden shadow-sm bg-white">
                    <div className="bg-[#b3d4df] px-4 py-2 flex items-center">
                        <div className="flex items-center space-x-2 w-48 text-blue-600 font-bold text-sm">
                            <span className="border-b border-blue-600 pb-0.5">Active</span>
                        </div>
                        <div className="flex items-center text-sm font-bold text-gray-800">
                            {q.customQuestionName || 'Custom Question'} <span className="ml-2 bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Custom</span>
                        </div>
                    </div>
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-3 w-48">Status</th>
                                <th className="p-3 font-bold text-gray-600">Allowed Options</th>
                                <th className="p-3 font-bold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="p-3 text-blue-500 font-medium">Active</td>
                                <td className="p-3">{q.options.join(', ')}</td>
                                <td className="p-3 text-right">
                                    <button onClick={() => handleDelete(q._id)} className="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded"><Trash2 size={14}/></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}

            {qualifications.length === 0 && (
                <div className="bg-white p-8 rounded shadow-sm text-center text-gray-500">
                    No qualifications added for this project yet. Click 'Add Qualification' to start.
                </div>
            )}

        </div>

                {/* Add Qualification Modal */}
        {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-xl flex flex-col max-h-[90vh]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">Add Project Qualification</h3>
                        <X className="cursor-pointer text-gray-500 hover:text-black" onClick={() => setShowAddModal(false)} />
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Profile Question</label>
                                <select className="w-full border p-2 rounded text-sm text-gray-700" value={formData.profileQuestionId} onChange={e => {
                                    const selected = PROFILE_QUESTIONS.find(q => q.id === e.target.value);
                                    if(selected) {
                                        setFormData({...formData, profileQuestionId: selected.id, questionFieldType: selected.fieldType, selectedAnswers: [], rangeStart: '', rangeEnd: ''});
                                    } else {
                                        setFormData({...formData, profileQuestionId: '', questionFieldType: '', selectedAnswers: [], rangeStart: '', rangeEnd: ''});
                                    }
                                }}>
                                    <option value="">Please Select</option>
                                    {PROFILE_QUESTIONS.map(q => (
                                        <option key={q.id} value={q.id}>{q.question}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Question Field Type</label>
                                <select className="w-full border p-2 rounded text-sm text-gray-700 bg-gray-50" value={formData.questionFieldType} disabled>
                                    <option value="">Select</option>
                                    <option value="Dropdown">Dropdown</option>
                                    <option value="Range">Range</option>
                                    <option value="Radio">Radio</option>
                                </select>
                            </div>
                        </div>

                        {formData.profileQuestionId && (
                            <div className="border rounded mt-4">
                                <div className="bg-gray-50 p-2 font-bold text-sm border-b">Answer</div>
                                <div className="p-0">
                                    {PROFILE_QUESTIONS.find(q => q.id === formData.profileQuestionId)?.fieldType === 'Range' ? (
                                        <div className="p-4 grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold mb-1">Min Value</label>
                                                <input type="number" className="w-full border p-2 rounded" value={formData.rangeStart} onChange={e => setFormData({...formData, rangeStart: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold mb-1">Max Value</label>
                                                <input type="number" className="w-full border p-2 rounded" value={formData.rangeEnd} onChange={e => setFormData({...formData, rangeEnd: e.target.value})} />
                                            </div>
                                        </div>
                                    ) : (
                                        <ul className="text-sm">
                                            {PROFILE_QUESTIONS.find(q => q.id === formData.profileQuestionId)?.options.map((opt, i) => (
                                                <li key={i} className="border-b last:border-b-0 p-3 flex items-center hover:bg-gray-50">
                                                    <input type="checkbox" className="mr-3" checked={formData.selectedAnswers.includes(opt)} onChange={e => {
                                                        const checked = e.target.checked;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            selectedAnswers: checked ? [...prev.selectedAnswers, opt] : prev.selectedAnswers.filter(a => a !== opt)
                                                        }));
                                                    }} />
                                                    {opt}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex space-x-2">
                        <button className="bg-[#4eb3f7] text-white px-4 py-1.5 rounded font-bold shadow hover:bg-blue-400 flex items-center text-sm" onClick={async () => {
                            try {
                                const selectedQ = PROFILE_QUESTIONS.find(q => q.id === formData.profileQuestionId);
                                if (!selectedQ) return alert('Select a profile question');
                                
                                const payload = {
                                    questionType: 'Custom',
                                    customQuestionName: selectedQ.question,
                                    options: formData.selectedAnswers,
                                    rangeStart: formData.rangeStart,
                                    rangeEnd: formData.rangeEnd
                                };

                                if (selectedQ.fieldType === 'Range' && (!payload.rangeStart || !payload.rangeEnd)) {
                                    return alert('Please enter start and end values.');
                                }
                                if (selectedQ.fieldType !== 'Range' && payload.options.length === 0) {
                                    return alert('Please select at least one answer option.');
                                }
                                
                                await api.post(/admin/projects/ + id + /qualifications, payload);
                                setShowAddModal(false);
                                setFormData({ profileQuestionId: '', questionFieldType: '', selectedAnswers: [], rangeStart: '', rangeEnd: '', questionType: 'Custom', customQuestionName: '' });
                                fetchQualifications();
                            } catch (e) {
                                console.error(e);
                                alert('Failed to save qualification.');
                            }
                        }}>
                            Save
                        </button>
                        <button className="px-4 py-1.5 text-red-500 border border-red-200 rounded font-bold hover:bg-red-50 text-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default ProjectQualification;

