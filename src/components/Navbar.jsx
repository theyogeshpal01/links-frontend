import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function Navbar({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (setAuth) {
      setAuth(false);
    }
    navigate('/login');
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-1 cursor-pointer">
          <span className="w-4 h-4 bg-orange-400 rounded-full"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
          <span className="w-4 h-4 bg-green-500 rounded-full"></span>
        </div>
        <div className="hidden space-x-6 text-sm font-medium text-gray-600 md:flex">
          <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          
          {/* Projects Dropdown */}
          <div className="relative pb-4 -mb-4 group">
            <button className="flex items-center h-full pt-1 hover:text-blue-600 focus:outline-none">
              Projects <span className="ml-1 text-[10px]">▼</span>
            </button>
            <div className="absolute left-0 z-50 hidden w-40 py-1 bg-white border rounded shadow-lg top-full group-hover:block">
              <Link to="/projects" className="block px-4 py-2 text-blue-500 hover:bg-gray-100">Projects</Link>
              <Link to="/study-types" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Study Type</Link>
            </div>
          </div>

          {/* Company Dropdown */}
          <div className="relative pb-4 -mb-4 group">
            <button className="flex items-center h-full pt-1 hover:text-blue-600 focus:outline-none">
              Company <span className="ml-1 text-[10px]">▼</span>
            </button>
            <div className="absolute left-0 z-50 hidden w-48 py-1 bg-white border rounded shadow-lg top-full group-hover:block">
              <Link to="/companies" className="block px-4 py-2 text-blue-500 hover:bg-gray-100">Company</Link>
              <Link to="/contacts" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Contacts</Link>
              <Link to="/contact-types" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Contact Types</Link>
            </div>
          </div>

          {/* Analysis Dropdown */}
          <div className="relative pb-4 -mb-4 group">
            <button className="flex items-center h-full pt-1 hover:text-blue-600 focus:outline-none">
              Analysis <span className="ml-1 text-[10px]">▼</span>
            </button>
            <div className="absolute left-0 z-50 hidden w-40 py-1 bg-white border rounded shadow-lg top-full group-hover:block">
              <Link to="/analysis/reports" className="block px-4 py-2 text-blue-500 hover:bg-gray-100">Reports</Link>
              <Link to="/analytics" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Analytics Logs</Link>
            </div>
          </div>

        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Welcome, Admin TTP</span>
        <button onClick={handleLogout} className="flex items-center px-2 py-1 text-xs font-medium text-red-500 border border-red-200 rounded hover:text-red-700 bg-red-50">
          <LogOut size={14} className="mr-1" /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
