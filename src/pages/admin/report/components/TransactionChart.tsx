import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

// Sample data that matches your chart pattern
const successfulData = [
  { date: 'Dec 01', total: 45000, successful: 35000 },
  { date: 'Dec 04', total: 42000, successful: 38000 },
  { date: 'Dec 07', total: 48000, successful: 41000 },
  { date: 'Dec 10', total: 35000, successful: 28000 },
  { date: 'Dec 13', total: 85000, successful: 82000 },
  { date: 'Dec 16', total: 65000, successful: 58000 },
  { date: 'Dec 19', total: 45000, successful: 42000 },
  { date: 'Dec 22', total: 40000, successful: 38000 },
  { date: 'Dec 25', total: 35000, successful: 32000 },
  { date: 'Dec 28', total: 25000, successful: 22000 },
  { date: 'Dec 31', total: 78000, successful: 75000 },
];


const TransactionChart: React.FC = () => {
  const [dateRange] = useState('1 Dec - 31 Dec 2024');

  const formatYAxisLabel = (value: number): string => {
    if (value >= 100000) return `₦${(value / 1000).toFixed(0)}k`;
    if (value >= 1000) return `₦${(value / 1000).toFixed(0)}k`;
    return `₦${value}`;
  };

  const handleExportReport = () => {
    // Export functionality would be implemented here
    // console.log('Exporting report...');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-semibold text-gray-900">Transaction Activity</h2>
          <span className="text-[12px] text-gray-500">
            Showing {dateRange}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Export Button */}
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2 rounded-lg text-[12px] font-medium hover:bg-blue-700 transition-colors"
          >
            <Download size={16} />
            Export report
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={successfulData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f0f0f0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={formatYAxisLabel}
              domain={[0, 'dataMax + 10000']}
            />
            <Line
              type="monotone"
              dataKey="successful"
              stroke="#FFC300"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#374151' }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#003366"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-sm text-gray-600">Total transaction</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FFC300]"></div>
          <span className="text-sm text-gray-600">Sucessful transaction</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;