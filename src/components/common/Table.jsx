import React from 'react';

const Table = ({ columns, data, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
      
      <div className="block md:hidden">
        {data && data.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {data.map((row, rowIndex) => (
              <div key={rowIndex} className="p-5 space-y-4 bg-white hover:bg-slate-50 transition-colors">
                {columns.map((col, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{col.header}</span>
                    <div className="text-sm text-slate-700 font-medium">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500">
            <p className="font-medium text-slate-600">No data available</p>
            <p className="text-xs mt-1">There are no records to display at this time.</p>
          </div>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              {columns.map((col, index) => (
                <th 
                  key={index}
                  className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50/50 transition-colors group">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-medium text-slate-600">No data available</p>
                    <p className="text-xs mt-1">There are no records to display at this time.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Table;
