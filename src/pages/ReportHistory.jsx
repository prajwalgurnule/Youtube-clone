import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ReportHistory = () => {
  const { theme } = useContext(ThemeContext);

  const reports = [
    { id: 1, content: "Inappropriate video", date: "2025-03-15", status: "Reviewed" },
    { id: 2, content: "Spam comment", date: "2025-04-02", status: "Pending" },
    { id: 3, content: "Copyright issue", date: "2025-04-20", status: "Resolved" },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Report History</h1>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {reports.length === 0 ? (
            <p>You haven't submitted any reports yet.</p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{report.content}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Reported on {report.date}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportHistory;