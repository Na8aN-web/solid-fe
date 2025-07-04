import React from 'react';

const StockAlertSection = () => {
    const stockAlerts = [
        { product: 'Toyota Brain Box 2016', unitsLeft: 10, percentage: 10 },
        { product: 'Toyota Brain Box 2016', unitsLeft: 20, percentage: 20 },
        { product: 'Toyota Brain Box 2016', unitsLeft: 20, percentage: 20 },
        { product: 'Toyota Brain Box 2016', unitsLeft: 20, percentage: 20 },
        { product: 'Toyota Brain Box 2016', unitsLeft: 20, percentage: 20 }
    ];

    return (
        <div className="bg-white rounded-xl   shadow-sm w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">Stock Alert</h2>
                <button className="text-xs text-primary font-medium hover:underline">
                    View All
                </button>
            </div>

            {/* Alerts */}
            <div className="space-y-4">
                {stockAlerts.map((alert, index) => (
                    <div key={index}>
                        <p className="text-sm font-medium text-gray-900">{alert.product}</p>

                        {/* Progress bar */}
                        <div className="w-full h-3 bg-[#F248221A] rounded-[10px] mt-2 mb-1">
                            <div
                                className="h-3 bg-[#F24822] rounded-full"
                                style={{ width: `${alert.percentage}%` }}
                            ></div>
                        </div>

                        {/* Info row */}
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{alert.unitsLeft} units left</span>
                            <span>{alert.percentage}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockAlertSection;
