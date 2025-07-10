import { useState } from 'react';
import { useNavigate, useLocation, To } from 'react-router-dom';
import SidebarIcon1 from '../../../assets/1.png'
import SidebarIcon2 from '../../../assets/2.png'
import SidebarIcon3 from '../../../assets/3.png'
import SidebarIcon4 from '../../../assets/4.png'
import SidebarIcon5 from '../../../assets/5.png'
import SidebarIcon6 from '../../../assets/6.png'
import SidebarIcon7 from '../../../assets/7.png'
import SidebarIcon8 from '../../../assets/8.png'
import SidebarIcon9 from '../../../assets/9.png'
import SidebarIcon10 from '../../../assets/10.png'
import SidebarIcon11 from '../../../assets/11.png'
import SidebarIcon12 from '../../../assets/12.png'
import Logo from '../../../assets/logo.png'

const sidebarItems = [
    { icon: SidebarIcon1, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: SidebarIcon2, label: 'Products', path: '/admin/products' },
    { icon: SidebarIcon3, label: 'Orders', path: '/admin/orders' },
    { icon: SidebarIcon4, label: 'Users', path: '/admin/users' },
    { icon: SidebarIcon5, label: 'Inventory', path: '/admin/inventory' },
    { icon: SidebarIcon6, label: 'Transactions', path: '/admin/transactions' },
    { icon: SidebarIcon7, label: 'Manufacturers', path: '/admin/manufacturers' },
    { icon: SidebarIcon8, label: 'Partners', path: '/admin/partners' },
    { icon: SidebarIcon9, label: 'Reports & Analytics', path: '/admin/reports' },
    { icon: SidebarIcon10, label: 'Send Notifications', path: '/admin/notifications' },
    { icon: SidebarIcon11, label: 'Inbox', path: '/admin/inbox' },
    { icon: SidebarIcon12, label: 'Settings', path: '/admin/settings' },
];

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path: To) => {
        navigate(path);
    };

    return (
        <div className="w-64 h-screen bg-white border-r py-[40px]">
            <div className="px-[40px]">
                <img src={Logo} alt="Logo" className="w-[140px]" />
            </div>
            <nav className="mt-10 space-y-1">
                {sidebarItems.map((sidebaritem, index) => {
                    const isActive = location.pathname === sidebaritem.path;
                    
                    return (
                        <div
                            key={index}
                            onClick={() => handleNavigation(sidebaritem.path)}
                            className={`flex items-center px-[44px] py-[20px] text-[14px] font-normal cursor-pointer hover:bg-gray-50 transition-all
                                ${isActive ? 'bg-[#0033661A] text-[#003366] border-r-4 border-[#003366]' : 'text-gray-700'}`}
                        >
                            <img src={sidebaritem.icon} alt={sidebaritem.label} className="w-5 h-5" />
                            <span className="ml-3">{sidebaritem.label}</span>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default AdminSidebar;