import React from 'react';

function ProjectDownload() {
  const downloadDummyCSV = (filename) => {
    const csvContent = "data:text/csv;charset=utf-8,ID,Status,Date\n1,Complete,2024-01-01\n2,Disqualified,2024-01-02";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 shadow-sm border-b min-h-[400px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        
        {/* Download Project IDs */}
        <div className="pr-6">
          <h2 className="text-xl text-gray-800 mb-6 font-normal">Download Project IDs</h2>
          <div className="flex flex-wrap gap-4 mb-6 text-[13px] text-gray-600">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-1.5 border-gray-300" /> Extension
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-1.5 border-gray-300" /> Ask on Redirect
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-1.5 border-gray-300" /> Referrer
            </label>
          </div>
          <button onClick={() => downloadDummyCSV('project_ids')} className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-4 py-1.5 rounded font-medium shadow-sm">
            Download
          </button>
        </div>

        {/* Respondent Data */}
        <div className="px-6">
          <h2 className="text-xl text-gray-800 mb-[52px] font-normal">Respondent Data</h2>
          <button onClick={() => downloadDummyCSV('respondent_data')} className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-4 py-1.5 rounded font-medium shadow-sm">
            Download
          </button>
        </div>

        {/* Rejected IDs */}
        <div className="pl-6">
          <h2 className="text-xl text-gray-800 mb-[52px] font-normal">Rejected IDs</h2>
          <button onClick={() => downloadDummyCSV('rejected_ids')} className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-4 py-1.5 rounded font-medium shadow-sm">
            Download
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProjectDownload;


