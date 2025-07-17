import React, { FC } from 'react';

interface StatsDataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

interface ChartProps {
  data: StatsDataPoint[];
  height?: number;
}

export const BarChart: FC<ChartProps> = ({ data, height = 300 }) => {
  const maxYValue = 100; // ₦100k is the max
  const chartHeight = height;
  const chartWidth = 600;
  const barSpacing = 50;
  const barWidth = 16;

  const yLabels = [0, 20, 40, 60, 80, 100];

  return (
    <div className="relative">
      <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {/* Y-axis lines and labels */}
        {yLabels.map((val, i) => {
          const y = chartHeight - (val / maxYValue) * chartHeight;
          return (
            <g key={i}>
              <line
                x1="0"
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={0}
                y={y - 4}
                fontSize="10"
                fill="#6b7280"
              >
                ₦{val}k
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const xOffset = i * barSpacing + 40;
          const revenueHeight = (d.revenue / maxYValue) * chartHeight;
          const expensesHeight = (d.expenses / maxYValue) * chartHeight;

          return (
            <g key={i}>
              {/* Revenue */}
              <rect
                x={xOffset}
                y={chartHeight - revenueHeight}
                width={barWidth}
                height={revenueHeight}
                fill="#003366"
                rx="3"
              />
              {/* Expenses */}
              <rect
                x={xOffset + barWidth + 4}
                y={chartHeight - expensesHeight}
                width={barWidth}
                height={expensesHeight}
                fill="#D9D9D9"
                rx="3"
              />
              {/* Month label */}
              <text
                x={xOffset + barWidth}
                y={chartHeight - 5}
                fontSize="10"
                fill="#6b7280"
                textAnchor="bottom"
              >
                {d.month}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex justify-center items-center gap-4 mt-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-gray-600">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#D9D9D9] rounded-full"></div>
          <span className="text-sm text-gray-600">Expenses</span>
        </div>
      </div>
    </div>
  );
};
