import React, { useState, FC } from 'react';

import {
    TrendingUp,
    Users,
    Package,
    ShoppingCart,
    Download,
    Eye,
    ShoppingBag,
    CreditCard,
    CheckCircle,
    Info,
    UserPlus
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import SalesChart from '../dashboard/components/SalesChart';
import RevenueChart from '../dashboard/components/RevenueChart';
import { BarChart } from './components/BarChart';
import StockAlertSection from '../dashboard/components/StockAlerts';
import TransactionChart from './components/TransactionChart';

// Interfaces for data structures
interface SalesDataPoint {
    month: string;
    orders: number;
    sales: number;
}

interface StatsDataPoint {
    month: string;
    revenue: number;
    expenses: number;
}

interface ConversionDataPoint {
    step: string;
    value: number;
    percentage: number;
}

interface PieChartDataPoint {
    label: string;
    value: number;
    color: string;
    percentage: number;
}

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ComponentType<{ className?: string }>;
}

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

interface ChartProps {
    data: SalesDataPoint[] | StatsDataPoint[];
    height?: number;
}

interface DonutChartProps {
    percentage: number;
    label: string;
    color: string;
}

interface PieChartProps {
    data: PieChartDataPoint[];
    size?: number;
}

const ReportsAnalytics: FC = () => {
    const [salesTab, setSalesTab] = useState<string>('Quarterly');
    const [statsTab, setStatsTab] = useState<string>('Jan - Dec 2024');
    const [retentionTab, setRetentionTab] = useState<string>('Jan - Dec 2024');
    const [transactionTab, setTransactionTab] = useState<string>('Jan - Dec 2024');

    // Sample data for charts
    const salesData: SalesDataPoint[] = [
        { month: 'Dec 01', orders: 45, sales: 42 },
        { month: 'Dec 04', orders: 52, sales: 48 },
        { month: 'Dec 07', orders: 35, sales: 38 },
        { month: 'Dec 10', orders: 48, sales: 45 },
        { month: 'Dec 13', orders: 65, sales: 68 },
        { month: 'Dec 16', orders: 42, sales: 45 },
        { month: 'Dec 19', orders: 38, sales: 35 },
        { month: 'Dec 22', orders: 55, sales: 58 },
        { month: 'Dec 25', orders: 48, sales: 45 },
        { month: 'Dec 28', orders: 62, sales: 65 },
        { month: 'Dec 31', orders: 58, sales: 55 }
    ];

    const statsData: StatsDataPoint[] = [
        { month: 'Jan', revenue: 45, expenses: 35 },
        { month: 'Feb', revenue: 52, expenses: 40 },
        { month: 'Mar', revenue: 68, expenses: 45 },
        { month: 'Apr', revenue: 35, expenses: 30 },
        { month: 'May', revenue: 78, expenses: 55 },
        { month: 'Jun', revenue: 65, expenses: 48 },
        { month: 'Jul', revenue: 85, expenses: 62 },
        { month: 'Aug', revenue: 72, expenses: 58 },
        { month: 'Sep', revenue: 95, expenses: 68 },
        { month: 'Oct', revenue: 78, expenses: 55 },
        { month: 'Nov', revenue: 45, expenses: 38 },
        { month: 'Dec', revenue: 88, expenses: 65 }
    ];

    const conversionData: ConversionDataPoint[] = [
        { step: 'Product views', value: 5495, percentage: 100 },
        { step: 'Add to cart', value: 3495, percentage: 64 },
        { step: 'Checkout initiated', value: 2495, percentage: 45 },
        { step: 'Completed purchases', value: 1495, percentage: 27 }
    ];

    const MetricCard: FC<MetricCardProps> = ({ title, value, change, isPositive, icon: Icon }) => (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="p-3 bg-blue-50 rounded-lg mb-2">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '↗' : '↘'} {change}
                    </span>
                </div>
            </div>
        </div>
    );

    const TabButton: FC<TabButtonProps> = ({ active, onClick, children }) => (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${active
                ? 'bg-white text-primary'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
        >
            {children}
        </button>
    );

    const LineChart: FC<ChartProps> = ({ data, height = 200 }) => (
        <div className="relative" style={{ height }}>
            <svg width="100%" height="100%" viewBox="0 0 600 200">
                {[0, 25, 50, 75, 100].map((y) => (
                    <line
                        key={y}
                        x1="0"
                        y1={y * 2}
                        x2="600"
                        y2={y * 2}
                        stroke="#f3f4f6"
                        strokeWidth="1"
                    />
                ))}

                <path
                    d={`M ${(data as SalesDataPoint[]).map((d, i) => `${(i * 60) + 30},${200 - (d.orders * 2)}`).join(' L ')}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                />

                <path
                    d={`M ${(data as SalesDataPoint[]).map((d, i) => `${(i * 60) + 30},${200 - (d.sales * 2)}`).join(' L ')}`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                />

                {(data as SalesDataPoint[]).map((d, i) => (
                    <g key={i}>
                        <circle cx={(i * 60) + 30} cy={200 - (d.orders * 2)} r="3" fill="#10b981" />
                        <circle cx={(i * 60) + 30} cy={200 - (d.sales * 2)} r="3" fill="#3b82f6" />
                    </g>
                ))}
            </svg>

            <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Orders</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Sales</span>
                </div>
            </div>
        </div>
    );

    const DonutChart: FC<DonutChartProps> = ({ percentage, label, color }) => (
        <div className="relative w-32 h-32">
            <svg width="128" height="128" viewBox="0 0 128 128">
                <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="16"
                />
                <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke={color}
                    strokeWidth="16"
                    strokeDasharray={`${(percentage / 100) * 351.86} 351.86`}
                    strokeDashoffset="0"
                    transform="rotate(-90 64 64)"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-900">{label}</span>
            </div>
        </div>
    );

    const PieChart: FC<PieChartProps> = ({ data, size = 200 }) => {
        const total = data.reduce((sum, item) => sum + item.value, 0);
        let cumulativePercentage = 0;

        return (
            <div className="relative" style={{ width: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    {data.map((item, index) => {
                        const percentage = (item.value / total) * 100;
                        const startAngle = (cumulativePercentage / 100) * 2 * Math.PI - Math.PI / 2;
                        const endAngle = ((cumulativePercentage + percentage) / 100) * 2 * Math.PI - Math.PI / 2;

                        const x1 = size / 2 + (size / 2 - 10) * Math.cos(startAngle);
                        const y1 = size / 2 + (size / 2 - 10) * Math.sin(startAngle);
                        const x2 = size / 2 + (size / 2 - 10) * Math.cos(endAngle);
                        const y2 = size / 2 + (size / 2 - 10) * Math.sin(endAngle);

                        const largeArc = percentage > 50 ? 1 : 0;

                        const path = `M ${size / 2} ${size / 2} L ${x1} ${y1} A ${size / 2 - 10} ${size / 2 - 10} 0 ${largeArc} 1 ${x2} ${y2} Z`;

                        cumulativePercentage += percentage;

                        return (
                            <path
                                key={index}
                                d={path}
                                fill={item.color}
                            />
                        );
                    })}
                </svg>

                <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-6">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-800">
                            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                            <span>{item.percentage}% {item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    return (
        <AdminLayout pageTitle="Report and Analytics">
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <MetricCard
                            title="Total Revenue"
                            value="₦250,000.00"
                            change="24.1%"
                            isPositive={true}
                            icon={TrendingUp}
                        />
                        <MetricCard
                            title="Total Customers"
                            value="25K"
                            change="12.1%"
                            isPositive={true}
                            icon={Users}
                        />
                        <MetricCard
                            title="Total Products"
                            value="50K"
                            change="10.2%"
                            isPositive={false}
                            icon={Package}
                        />
                        <MetricCard
                            title="Total Orders"
                            value="10K"
                            change="28.8%"
                            isPositive={true}
                            icon={ShoppingCart}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                        {/* Sales Chart - 70% width (7 columns) */}
                        <div className="lg:col-span-7">
                            <SalesChart />
                        </div>

                        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <RevenueChart />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-8">
                        <div className="lg:col-span-7 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Sales Statistics</h2>
                                    <p className="text-sm text-gray-600">Showing Jan - Dec 2024</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
                                    <Download className="w-4 h-4" />
                                    Export report
                                </button>
                            </div>
                            <BarChart data={statsData} height={300} />
                        </div>


                        <div className="bg-white p-6 lg:col-span-3 rounded-lg border border-gray-200">
                            <StockAlertSection />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 my-8">
                        <div className='lg:col-span-4 flex items-center gap-6'>
                            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                                <div className="text-center mb-4">
                                    <div className="flex justify-center mb-2">
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-[16px] font-bold text-gray-900">49,383</h3>
                                    <p className="text-[12px] text-gray-600">All Customers</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                                <div className="text-center mb-4">
                                    <div className="flex justify-center mb-2">
                                        <UserPlus className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-[16px] font-bold text-gray-900">18,345</h3>
                                    <p className="text-[12px] text-gray-600">New Customers</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                                <div className="text-center mb-4">
                                    <div className="flex justify-center mb-2">
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-[16px] font-bold text-gray-900">8,345</h3>
                                    <p className="text-[12px] text-gray-600">Regular Customers</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate</h3>

                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                {/* Left Table */}
                                <div className="w-full md:w-2/3">
                                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 border-b pb-2">
                                        <span className="text-gray-500 font-normal">Year</span>
                                        <span className="text-gray-500 font-normal">Customers</span>
                                        <span className="text-gray-500 font-normal">Trend</span>
                                        <span className="text-gray-500 font-normal">Revenue</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 py-2">
                                        <span className="font-semibold text-gray-800">2023</span>
                                        <span className="text-gray-700">4,876</span>
                                        <span className="text-gray-700">10%</span>
                                        <span className="text-gray-700">₦150k</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 py-2">
                                        <span className="font-semibold text-gray-800">2024</span>
                                        <span className="text-gray-700">8,876</span>
                                        <span className="text-gray-700">32%</span>
                                        <span className="text-gray-700">₦250k</span>
                                    </div>
                                </div>

                                {/* Right Section */}
                                <div className="w-full md:w-1/3 flex flex-col justify-center">
                                    <div className="flex items-end justify-between">
                                        <div className="text-center">
                                            <p className="text-xl font-semibold text-gray-900">42,009</p>
                                            <p className="text-sm text-gray-500">Regular Customers</p>
                                            <p className="text-green-500 text-xs font-medium flex items-center justify-center gap-1 mt-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                </svg>
                                                32.45%
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xl font-semibold text-gray-900">12,096</p>
                                            <p className="text-sm text-gray-500">New Customers</p>
                                            <p className="text-green-500 text-xs font-medium flex items-center justify-center gap-1 mt-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                </svg>
                                                32.45%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8">
                        <div className="lg:col-span-7 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex w-full items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Customer Retention Rate</h2>
                                    <p className="text-sm text-gray-600">Showing Jan - Dec 2024</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors">
                                    <Download className="w-4 h-4" />
                                    Export report
                                </button>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="flex-1 flex flex-col items-center">
                                    <PieChart
                                        data={[
                                            { label: 'New Customers', value: 28148, color: '#002D72', percentage: 57 },
                                            { label: 'Frequent Customers', value: 8395, color: '#1DBE09', percentage: 17 },
                                            { label: 'Idle Users', value: 7901, color: '#F97316', percentage: 16 },
                                            { label: 'Cart Abandoners', value: 4938, color: '#FACC15', percentage: 10 },
                                        ]}
                                        size={300}
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Customers - 49,383 (2024)</h3>
                                    <p className="text-sm text-gray-600 mb-6">
                                        This chart shows the number of customers solid spare parts platform retained over the year.
                                        It also shows the new, frequent, and idle users and the cart abandoners visitors.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-[#002D72] rounded-full flex-shrink-0"></div>
                                            <span className="text-sm">New Customers - <span className="font-medium">57%</span>, which is 28,148 visitors</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-[#1DBE09] rounded-full flex-shrink-0"></div>
                                            <span className="text-sm">Frequent Customers - <span className="font-medium">17%</span>, which is 8,395 visitors</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-[#F97316] rounded-full flex-shrink-0"></div>
                                            <span className="text-sm">Idle Users - <span className="font-medium">16%</span>, which is 7,901 visitors</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-[#FACC15] rounded-full flex-shrink-0"></div>
                                            <span className="text-sm">Cart Abandoners - <span className="font-medium">10%</span>, which is 4,938 visitors</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Conversion Rate</h2>
                                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                            </div>

                            <div className="mb-6">
                                <div className="text-center mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900">9.88%</h3>
                                    <p className="text-sm text-green-600">22.45%</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-medium text-blue-600">1</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Product views</p>
                                            <p className="text-xs text-gray-600">10%</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">5,495</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-medium text-blue-600">2</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Add to cart</p>
                                            <p className="text-xs text-gray-600">20%</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">3,495</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-medium text-blue-600">3</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Checkout initiated</p>
                                            <p className="text-xs text-gray-600">20%</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">2,495</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-medium text-blue-600">4</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Completed purchases</p>
                                            <p className="text-xs text-gray-600">5%</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">1,495</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8">
                        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Least Sold Items</h2>
                                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'Toyota Brain Box 2016', price: '₦42,000.00', units: 20, percentage: 20, image: 'toyota-brain-box.jpg' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{item.price}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-20 h-2 bg-red-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-red-500 rounded-full"
                                                        style={{ width: `${item.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-gray-600">{item.units} units left</span>
                                                <span className="text-xs text-gray-600">{item.percentage}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Most Sold Items</h2>
                                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-sm text-gray-600 border-b">
                                            <th className="p-3">Product Name</th>
                                            <th className="p-3">Sales</th>
                                            <th className="p-3">Revenue</th>
                                            <th className="p-3">Stock</th>
                                            <th className="p-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: 'Michellene Tyre', sales: '127 pcs', revenue: '₦42,000.00', stock: '650/560', status: 'In stock', image: 'michellene-tyre.jpg' },
                                            { name: 'Michellene Tyre', sales: '127 pcs', revenue: '₦42,000.00', stock: '0/560', status: 'Out of stock', image: 'michellene-tyre.jpg' },
                                        ].map((item, index) => (
                                            <tr key={index} className="border-b text-sm">
                                                <td className="p-3 font-medium text-gray-900 flex items-center gap-2">
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                    {item.name}
                                                </td>
                                                <td className="p-3 text-gray-600">{item.sales}</td>
                                                <td className="p-3 text-gray-600">{item.revenue}</td>
                                                <td className="p-3 text-gray-600">{item.stock}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'In stock'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                        <div className="lg:col-span-7">
                            <TransactionChart />
                        </div>

                        <div className=" lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Active Users by City</h2>
                            <div className="space-y-4">
                                {[
                                    { city: 'Lagos', percentage: 75 },
                                    { city: 'Onitsha', percentage: 65 },
                                    { city: 'Abuja', percentage: 60 },
                                    { city: 'Port Harcourt', percentage: 55 },
                                    { city: 'Kano', percentage: 50 },
                                    { city: 'Ibadan', percentage: 45 },
                                    { city: 'Enugu', percentage: 40 }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-900">{item.city}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600 w-8">{item.percentage}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ReportsAnalytics;