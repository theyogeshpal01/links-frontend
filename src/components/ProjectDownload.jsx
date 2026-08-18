import React from 'react';

function ProjectDownload() {
  return (
    <div className="bg-white p-6 shadow-sm border-b">
      <div className="grid grid-cols-3 gap-6 divide-x divide-gray-200">
        
        {/* Download Project IDs */}
        <div className="pr-6">
          <h2 className="text-xl text-gray-800 mb-4 font-normal">Download Project IDs</h2>
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-700">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" /> Extension
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" /> Ask on Redirect
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" /> Referrer
            </label>
          </div>
          <button className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-4 py-1.5 rounded text-sm font-bold shadow-sm">
            Download
          </button>
        </div>

        {/* Respondent Data */}
        <div className="px-6">
          <h2 className="text-xl text-gray-800 mb-8 font-normal">Respondent Data</h2>
          <button className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-4 py-1.5 rounded text-sm font-bold shadow-sm">
            Download
          </button>
        </div>

        {/* Rejected IDs */}
        <div className="pl-6">
          <h2 className="text-xl text-gray-800 mb-8 font-normal">Rejected IDs</h2>
          <button className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-4 py-1.5 rounded text-sm font-bold shadow-sm">
            Download
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProjectDownload;
