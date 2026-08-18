import React from 'react';

function ProjectQuota() {
  return (
    <div className="bg-white">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="p-4 font-semibold">Quota Name</th>
            <th className="p-4 font-semibold">Quota</th>
            <th className="p-4 font-semibold">Total Remaining</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" className="p-4 text-center text-red-500 bg-[#f4f4f4] border-b">
              No quota added
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProjectQuota;
