import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

// Sample data that matches your chart pattern
const salesData = [
  { date: 'Dec 01', orders: 45000, sales: 35000 },
  { date: 'Dec 04', orders: 42000, sales: 38000 },
  { date: 'Dec 07', orders: 48000, sales: 41000 },
  { date: 'Dec 10', orders: 35000, sales: 28000 },
  { date: 'Dec 13', orders: 85000, sales: 82000 },
  { date: 'Dec 16', orders: 65000, sales: 58000 },
  { date: 'Dec 19', orders: 45000, sales: 42000 },
  { date: 'Dec 22', orders: 40000, sales: 38000 },
  { date: 'Dec 25', orders: 35000, sales: 32000 },
  { date: 'Dec 28', orders: 25000, sales: 22000 },
  { date: 'Dec 31', orders: 78000, sales: 75000 },
];

type TimeRange = 'Quarterly' | 'Monthly' | 'Yearly';

const SalesChart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('Monthly');
  const [dateRange] = useState('1 Dec - 31 Dec 2024');

  const formatYAxisLabel = (value: number): string => {
    if (value >= 100000) return `₦${(value / 1000).toFixed(0)}k`;
    if (value >= 1000) return `₦${(value / 1000).toFixed(0)}k`;
    return `₦${value}`;
  };

  const handleExportReport = () => {
    // Export functionality would be implemented here
  };

  const handleRangeChange = (range: TimeRange) => {
    setSelectedRange(range);
    // Here you would typically fetch new data based on the selected range
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between mb-6 space-y-3">
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-semibold text-gray-900">Sales Summary</h2>
          <span className="text-[12px] text-gray-500">
            Showing {dateRange}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
          {/* Time Range Buttons */}
          <div className="flex bg-[#E3E6EA] rounded-lg p-1 w-ful">
            {(['Quarterly', 'Monthly', 'Yearly'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => handleRangeChange(range)}
                className={`px-2 py-2 sm:px-4 sm:py-2 text-[12px] font-medium rounded-md transition-colors ${
                  selectedRange === range
                    ? 'bg-white text-[#003366] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          
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
            data={salesData}
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
              dataKey="orders"
              stroke="#374151"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#374151' }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
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
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
          <span className="text-sm text-gray-600">Orders</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">Sales</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;