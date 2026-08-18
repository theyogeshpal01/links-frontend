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
    <nav className="bg-white border-b flex items-center justify-between px-6 py-3 shadow-sm relative z-50">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-1 cursor-pointer">
          <span className="w-4 h-4 bg-orange-400 rounded-full"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
          <span className="w-4 h-4 bg-green-500 rounded-full"></span>
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          
          {/* Projects Dropdown */}
          <div className="relative group pb-4 -mb-4">
            <button className="hover:text-blue-600 focus:outline-none flex items-center h-full pt-1">
              Projects <span className="ml-1 text-[10px]">▼</span>
            </button>
            <div className="absolute left-0 top-full mt-1 w-40 bg-white border shadow-lg rounded py-1 hidden group-hover:block">
              <Link to="/projects" className="block px-4 py-2 hover:bg-gray-100 text-blue-500">Projects</Link>
              <Link to="/study-types" className="block px-4 py-2 hover:bg-gray-100 text-gray-600">Study Type</Link>
            </div>
          </div>

          {/* Company Dropdown */}
          <div className="relative group pb-4 -mb-4">
            <button className="hover:text-blue-600 focus:outline-none flex items-center h-full pt-1">
              Company <span className="ml-1 text-[10px]">▼</span>
            </button>
            <div className="absolute left-0 top-full mt-1 w-48 bg-white border shadow-lg rounded py-1 hidden group-hover:block">
              <Link to="/companies" className="block px-4 py-2 hover:bg-gray-100 text-blue-500">Company Management</Link>
              <Link to="/contacts" className="block px-4 py-2 hover:bg-gray-100 text-gray-600">Contacts</Link>
              <Link to="/contact-types" className="block px-4 py-2 hover:bg-gray-100 text-gray-600">Contact Types</Link>
            </div>
          </div>

          {/* Analysis Dropdown */}
          <div className="relative group pb-4 -mb-4">
            <button className="hover:text-blue-600 focus:outline-none flex items-center h-full pt-1">
              Analysis <span className="ml-1 text-[10px]">▼</span>
            </button>
            <div className="absolute left-0 top-full mt-1 w-40 bg-white border shadow-lg rounded py-1 hidden group-hover:block">
              <Link to="/analytics" className="block px-4 py-2 hover:bg-gray-100 text-gray-600">Analytics Logs</Link>
            </div>
          </div>

        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Welcome, Admin TTP</span>
        <button onClick={handleLogout} className="text-red-500 hover:text-red-700 flex items-center border border-red-200 px-2 py-1 rounded bg-red-50 font-medium text-xs">
          <LogOut size={14} className="mr-1" /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
