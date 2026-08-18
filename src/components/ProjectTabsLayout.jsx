import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import api from '../api';

function ProjectTabsLayout() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/admin/projects/${id}`);
        setProject(res.data);
      } catch (e) {
        console.error("Error fetching project", e);
      }
    };
    if (id) fetchProject();
  }, [id]);

  const tabs = [
    { name: 'Project', path: 'edit' },
    { name: 'Qualification', path: 'qualification' },
    { name: 'Project Quota', path: 'quota' },
    { name: 'Suppliers', path: 'suppliers' },
    { name: 'Client Link', path: 'client-link' },
    { name: 'Reconcile', path: 'reconcile' },
    { name: 'Download', path: 'download' },
    { name: 'Map Foreign IDs', path: 'map-foreign-ids' }
  ];

  return (
    <div className="bg-[#f0f2f5] min-h-screen">
      
      {/* Tabs Row */}
      <div className="bg-gray-500 text-white flex text-sm font-medium overflow-x-auto">
        {tabs.map(tab => (
          <NavLink
            key={tab.name}
            to={`/projects/${id}/${tab.path}`}
            className={({ isActive }) => 
              `px-6 py-2.5 whitespace-nowrap ${isActive ? 'bg-[#4b8df8]' : 'hover:bg-gray-400'}`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      {/* Blue Project Header */}
      <div className="bg-[#4b8df8] text-white p-3 flex justify-between items-center shadow-sm">
        <h2 className="text-sm font-bold flex items-center">
            Project (# 1403 :: P-0) <span className="underline ml-1 uppercase">{project?.name || 'Loading...'}</span>
        </h2>
        <RefreshCw size={16} className="cursor-pointer hover:text-gray-200" />
      </div>

      {/* Main Content Area */}
      <Outlet context={{ project, setProject }} />

    </div>
  );
}

export default ProjectTabsLayout;
