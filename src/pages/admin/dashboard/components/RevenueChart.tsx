import React from 'react';

interface DataItem {
  label: string;
  value: number;
  color: string;
}

interface RevenueSummaryProps {
  year?: string;
  profitAmount?: string;
  data?: DataItem[];
}

const RevenueChart: React.FC<RevenueSummaryProps> = ({ 
  year = "2024", 
  profitAmount = "₦4.5M",
  data = [
    { label: "Profit", value: 60, color: "#15B70D" },
    { label: "Revenue", value: 15, color: "#FFC300" },
    { label: "Expenses", value: 25, color: "#F24822" }
  ]
}) => {
  // Calculate angles for each segment
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start from top
  
  const segments = data.map(item => {
    const angle = (item.value / total) * 360;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      angle: angle
    };
    currentAngle += angle;
    return segment;
  });

  // Function to create SVG path for donut segment
  const createPath = (centerX: number, centerY: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number): string => {
    const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y, 
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number; y: number } => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="bg-white px-6 rounded-lg w-full s">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Revenue Summary</h2>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-600">{year}</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* SVG Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width="220" height="220" className="transform -rotate-90">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPath(110, 110, 80, 105, segment.startAngle, segment.endAngle)}
                fill={segment.color}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Profit</p>
              <p className="text-xl font-bold text-gray-900">{profitAmount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;