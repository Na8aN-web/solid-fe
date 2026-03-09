import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    TrendingUp,
    Users,
    Package,
    ShoppingCart,
    RefreshCw,
    AlertTriangle,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import SalesChart from './components/SalesChart';
import RevenueChart from './components/RevenueChart';
import { 
  fetchDashboardMetrics, 
  fetchRecentOrders, 
  fetchLowStockProducts,
  clearDashboardErrors,
  type AdminDashboardState
} from '../../../store/slices/adminDashboardSlice';
import type { RootState, AppDispatch } from '../../../store';

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ReactNode;
    loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon, 
  loading = false 
}) => (
    <div className="bg-white flex items-center justify-between p-6 rounded-lg shadow-sm border">
        <div>
            <p className="text-[12px] text-gray-600 mb-1">{title}</p>
            {loading ? (
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : (
                <p className="text-[16px] font-bold text-gray-900">{value}</p>
            )}
        </div>
        {/* <div className="flex flex-col items-center justify-between mb-4">
            <div className="p-2 rounded-lg">
                <img src={AdminCard} alt='adminicon' />
            </div>
            {loading ? (
                <div className="h-3 w-12 bg-gray-200 animate-pulse rounded"></div>
            ) : (
                <span className={`text-[10px] font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '↗' : '↘'} {change}
                </span>
            )}
        </div> */}
    </div>
);

const LoadingSpinner: React.FC = () => (
    <RefreshCw className="w-4 h-4 animate-spin text-gray-500" />
);

const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    // const [activeTab, setActiveTab] = useState('Quarterly');

    // Redux state with explicit typing
    const {
        metrics,
        recentOrders,
        lowStockProducts,
        loading,
        error
    } = useSelector((state: RootState) => state.adminDashboard as AdminDashboardState);

    // Fetch data on component mount
    useEffect(() => {
        const fetchAllData = () => {
            dispatch(fetchDashboardMetrics());
            dispatch(fetchRecentOrders());
            dispatch(fetchLowStockProducts());
        };

        fetchAllData();

        // Set up auto-refresh every 5 minutes
        const interval = setInterval(fetchAllData, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [dispatch]);

    // Helper function to format currency
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Helper function to format numbers
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

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

    const handleRefresh = () => {
        dispatch(clearDashboardErrors());
        dispatch(fetchDashboardMetrics());
        dispatch(fetchRecentOrders());
        dispatch(fetchLowStockProducts());
    };

    return (
        <AdminLayout pageTitle="Dashboard">
            {/* Header with refresh button */}
            <div className="flex justify-between items-center mb-6">
               
                <button
                    onClick={handleRefresh}
                    disabled={loading.metrics || loading.orders || loading.lowStock}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {(loading.metrics || loading.orders || loading.lowStock) ? (
                        <LoadingSpinner />
                    ) : (
                        <RefreshCw className="w-4 h-4" />
                    )}
                    Refresh
                </button>
            </div>

            {/* Error Messages */}
            {(error.metrics || error.orders || error.lowStock) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">Some data could not be loaded:</span>
                    </div>
                    <ul className="mt-2 text-sm text-red-700">
                        {error.metrics && <li>• {error.metrics}</li>}
                        {error.orders && <li>• {error.orders}</li>}
                        {error.lowStock && <li>• {error.lowStock}</li>}
                    </ul>
                </div>
            )}

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Total Revenue"
                    value={metrics ? formatCurrency(metrics.totalRevenue) : '₦0.00'}
                    change={metrics ? `${metrics.revenueChange}%` : '0%'}
                    isPositive={metrics ? metrics.revenueChange > 0 : false}
                    icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
                    loading={loading.metrics}
                />
                <MetricCard
                    title="Total Customers"
                    value={metrics ? formatNumber(metrics.totalCustomers) : '0'}
                    change={metrics ? `${metrics.customersChange}%` : '0%'}
                    isPositive={metrics ? metrics.customersChange > 0 : false}
                    icon={<Users className="w-5 h-5 text-blue-600" />}
                    loading={loading.metrics}
                />
                <MetricCard
                    title="Total Products"
                    value={metrics ? formatNumber(metrics.totalProducts) : '0'}
                    change={metrics ? `${Math.abs(metrics.productsChange)}%` : '0%'}
                    isPositive={metrics ? metrics.productsChange > 0 : false}
                    icon={<Package className="w-5 h-5 text-blue-600" />}
                    loading={loading.metrics}
                />
                <MetricCard
                    title="Total Orders"
                    value={metrics ? formatNumber(metrics.totalOrders) : '0'}
                    change={metrics ? `${metrics.ordersChange}%` : '0%'}
                    isPositive={metrics ? metrics.ordersChange > 0 : false}
                    icon={<ShoppingCart className="w-5 h-5 text-blue-600" />}
                    loading={loading.metrics}
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
                        <h2 className="text-[16px] font-semibold">
                            Recent Orders
                            {loading.orders && <LoadingSpinner />}
                        </h2>
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
                                {loading.orders ? (
                                    // Loading skeleton
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-4">
                                                <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
                                            </td>
                                            <td className="p-4">
                                                <div className="h-6 bg-gray-200 animate-pulse rounded w-16"></div>
                                            </td>
                                        </tr>
                                    ))
                                ) : recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <tr key={order.id} className="border-b text-[#5E5E5E] last:border-b-0">
                                            <td className="p-4">
                                                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-gray-500" />
                                                </div>
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">
                                            No recent orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Stock Alert */}
                <div className="bg-white p-6 lg:col-span-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-semibold">
                            Low Stock Alert
                            {loading.lowStock && <LoadingSpinner />}
                        </h2>
                    </div>
                    
                    {loading.lowStock ? (
                        <div className="space-y-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    ) : lowStockProducts.length > 0 ? (
                        <div className="space-y-4">
                            {lowStockProducts.map((product) => (
                                <div key={product.id} className="border-b pb-3 last:border-b-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {product.name}
                                        </p>
                                        <span className="text-xs text-red-600 font-medium">
                                            {product.currentStock} left
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-red-600 h-2 rounded-full" 
                                            style={{ width: `${Math.min(product.stockPercentage, 100)}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {product.stockPercentage}% of minimum stock
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 text-sm">
                            All products are well stocked
                        </p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;