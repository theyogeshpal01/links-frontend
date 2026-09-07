import React, { useState } from 'react';

function ProjectMapForeignIDs() {
  const [ids, setIds] = useState('');

  const handleDownload = () => {
    if (!ids.trim()) return alert('Please enter some IDs to map.');
    const idArray = ids.split(/\r?\n/).filter(x => x.trim());
    
    // Generate mapped CSV
    let csvContent = "data:text/csv;charset=utf-8,Redirect_ID,Mapped_Foreign_ID\n";
    idArray.forEach(id => {
      csvContent += ${id.trim()},FID_\n;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mapped_foreign_ids.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 shadow-sm border-b min-h-[400px]">
      <h2 className="text-2xl text-gray-800 mb-6 font-normal">
        Map <span className="underline font-medium">Redirect IDs</span> to <span className="underline font-medium">Foreign IDs</span>
      </h2>
      
      <div className="flex items-start">
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm mb-2 font-medium">
            Copy Redirect IDs :
          </label>
          <textarea 
            className="w-full h-64 border rounded border-gray-300 p-2 focus:outline-none focus:border-blue-400"
            value={ids}
            onChange={(e) => setIds(e.target.value)}
          ></textarea>
          <p className="text-gray-600 text-sm mt-2">
            Copy Paste all IDs from Excel/CSV File in the above box
          </p>
        </div>
        
        <div className="ml-6 mt-7">
          <button onClick={handleDownload} className="bg-[#4eb3f7] hover:bg-blue-400 text-white px-4 py-1.5 rounded text-sm font-bold shadow-sm">
            Download Map IDs
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectMapForeignIDs;
