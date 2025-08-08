import React, { useState } from 'react';
import {
    TrendingUp,
    Users,
    Package,
    ShoppingCart,
} from 'lucide-react';
import AdminCard from '../../../assets/admincard.png';
import AdminLayout from '../components/AdminLayout';
import SalesChart from './components/SalesChart';
import RevenueChart from './components/RevenueChart';
import StockAlertSection from './components/StockAlerts';

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ReactNode;
}

interface Order {
    id: string;
    product: string;
    buyer: string;
    orderId: string;
    amount: string;
    status: 'Delivered' | 'Processing' | 'Returned';
}

interface StockAlert {
    product: string;
    unitsLeft: number;
    percentage: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => (
    <div className="bg-white flex items-center justify-between p-6 rounded-lg shadow-sm border">
        <div>
            <p className="text-[12px] text-gray-600 mb-1">{title}</p>
            <p className="text-[16px] font-bold text-gray-900">{value}</p>
        </div>
        <div className="flex flex-col items-center justify-between mb-4">
            <div className="p-2 rounded-lg">
                <img src={AdminCard} alt='adminicon' />
            </div>
            <span className={`text-[10px] font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '↗' : '↘'} {change}
            </span>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Quarterly');

    const orders: Order[] = [
        {
            id: '1',
            product: 'Michellene Tyre',
            buyer: 'Michellene Tyre',
            orderId: '2563823270',
            amount: '₦250,000.00',
            status: 'Delivered'
        },
        {
            id: '2',
            product: 'Michellene Tyre',
            buyer: 'Michellene Tyre',
            orderId: '2563823270',
            amount: '₦250,000.00',
            status: 'Delivered'
        },
        {
            id: '3',
            product: 'Michellene Tyre',
            buyer: 'Michellene Tyre',
            orderId: '2563823270',
            amount: '₦250,000.00',
            status: 'Processing'
        },
        {
            id: '4',
            product: 'Michellene Tyre',
            buyer: 'Michellene Tyre',
            orderId: '2563823270',
            amount: '₦250,000.00',
            status: 'Returned'
        }
    ];

    const stockAlerts: StockAlert[] = [
        { product: 'Toyota Brain Box 2016', unitsLeft: 10, percentage: 10 },
        { product: 'Toyota Brain Box 2016', unitsLeft: 20, percentage: 20 },
        { product: 'Toyota Brain Box 2016', unitsLeft: 20, percentage: 20 },
        { product: 'Toyota Brain Box 2016', unitsLeft: 20, percentage: 20 },
        { product: 'Toyota Brain Box 2016', unitsLeft: 20, percentage: 20 }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'bg-[#E1F1E0] text-[#15B70D]';
            case 'Processing':
                return 'bg-[#FFC30026] text-[#DFAB00]';
            case 'Returned':
                return 'bg-[#FF5F0026] text-[#FF5F00]';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout pageTitle="Dashboard">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Total Revenue"
                    value="₦250,000.00"
                    change="24.1%"
                    isPositive={true}
                    icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
                />
                <MetricCard
                    title="Total Customers"
                    value="25K"
                    change="12.1%"
                    isPositive={true}
                    icon={<Users className="w-5 h-5 text-blue-600" />}
                />
                <MetricCard
                    title="Total Products"
                    value="50K"
                    change="10.2%"
                    isPositive={false}
                    icon={<Package className="w-5 h-5 text-blue-600" />}
                />
                <MetricCard
                    title="Total Orders"
                    value="10K"
                    change="28.8%"
                    isPositive={true}
                    icon={<ShoppingCart className="w-5 h-5 text-blue-600" />}
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
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-lg lg:col-span-7 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-semibold">Recent Orders</h2>
                        <button className="text-primary hover:text-blue-800 text-sm font-medium">
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm bg-[#F8F8F8] text-gray-600 border-b">
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Product Name</th>
                                    <th className="p-4">Buyer Name</th>
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Order Amount</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b text-[#5E5E5E] last:border-b-0">
                                        <td className="p-4">
                                            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                                        </td>
                                        <td className="p-4 text-sm">{order.product}</td>
                                        <td className="p-4 text-sm">{order.buyer}</td>
                                        <td className="p-4 text-sm">{order.orderId}</td>
                                        <td className="p-4 text-sm font-medium">{order.amount}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-[4px] text-xs font-normal ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Stock Alert */}
                <div className="bg-white p-6 lg:col-span-3 rounded-lg border border-gray-200">
                    <StockAlertSection />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;