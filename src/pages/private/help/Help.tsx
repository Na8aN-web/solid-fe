import { useState } from 'react';
import BrandNav from '../home/components/BrandNav';
import Navbar from './components/Navbar';
import InteractiveFAQPage from './components/Faq';

// Define TypeScript types
type SidebarItem = {
    id: string;
    title: string;
    icon: string;
};

type StepContent = {
    title: string;
    description: string[];
};

// Main Help Center component
const HelpCenter = () => {
    // State to track active sidebar item
    const [activeItem, setActiveItem] = useState('place-order');
    // State to track if content is showing on mobile (false means sidebar is showing)
    const [showContentOnMobile, setShowContentOnMobile] = useState(false);

    // Sidebar items data
    const sidebarItems: SidebarItem[] = [
        { id: 'place-order', title: 'Place an order', icon: 'clipboard-list' },
        { id: 'pay-order', title: 'Pay for your order', icon: 'credit-card' },
        { id: 'track-order', title: 'Track your order', icon: 'truck' },
        { id: 'cancel-order', title: 'Cancel an order', icon: 'x-circle' },
        { id: 'return-request', title: 'Return request', icon: 'refresh-cw' },
        { id: 'rate-product', title: 'Rate product', icon: 'star' },
        { id: 'faqs', title: 'FAQs', icon: 'help-circle' },
    ];

    // Steps data for place order section
    const orderSteps: StepContent[] = [
        {
            title: 'Step 1',
            description: [
                'Browse the SOLID SPARE PARTS WEBSITE or use the search bar to find the product you want to order',
                'Click on the product to view more information and details'
            ],
        },
        {
            title: 'Step 2',
            description: [
                'Browse the SOLID SPARE PARTS WEBSITE or use the search bar to find the product you want to order',
                'Click on the product to view more information and details'
            ],
        },
        {
            title: 'Step 3',
            description: [
                'Browse the SOLID SPARE PARTS WEBSITE or use the search bar to find the product you want to order',
                'Click on the product to view more information and details'
            ],
        },
        {
            title: 'Step 4',
            description: [
                'Browse the SOLID SPARE PARTS WEBSITE or use the search bar to find the product you want to order',
                'Click on the product to view more information and details'
            ],
        },
        {
            title: 'Step 5',
            description: [
                'Browse the SOLID SPARE PARTS WEBSITE or use the search bar to find the product you want to order',
                'Click on the product to view more information and details'
            ],
        },
        {
            title: 'Step 6',
            description: [
                'Browse the SOLID SPARE PARTS WEBSITE or use the search bar to find the product you want to order',
                'Click on the product to view more information and details'
            ],
        },
    ];

    // Handle sidebar item click on mobile
    const handleSidebarItemClick = (itemId: string) => {
        setActiveItem(itemId);
        // On mobile, show the content when an item is clicked
        setShowContentOnMobile(true);
    };

    // Handle back button click
    const handleBackClick = () => {
        setShowContentOnMobile(false);
    };

    // Placeholder content for other pages
    const getContent = () => {
        switch (activeItem) {
            case 'place-order':
                return (
                    <div>
                        <h2 className="text-xl font-medium mb-4">Steps to place an order</h2>
                        <div className="space-y-8">
                            {orderSteps.map((step, index) => (
                                <div key={index} className="flex">
                                    <div className="mr-4">
                                        <div className="flex items-center justify-center w-6 h-6 bg-[#2D2828] rounded-full">
                                            <div className="w-3 h-3 bg-[#D9D9D9] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{step.title}</h3>
                                        <ul className="mt-2 ml-5 list-disc text-sm text-gray-700">
                                            {step.description.map((desc, i) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                        <div className="mt-4 mb-6 bg-gray-300 h-40 w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'pay-order':
                return (
                    <div>
                        <h2 className="text-xl font-medium mb-4">Payment Options</h2>
                        <p>Information about payment methods and processes would go here.</p>
                    </div>
                );
            case 'track-order':
                return (
                    <div>
                        <h2 className="text-xl font-medium mb-4">Track Your Order</h2>
                        <p>Information about how to track orders would go here.</p>
                    </div>
                );
            case 'cancel-order':
                return (
                    <div>
                        <h2 className="text-xl font-medium mb-4">Cancel an Order</h2>
                        <p>Steps to cancel an order would be displayed here.</p>
                    </div>
                );
            case 'return-request':
                return (
                    <div>
                        <h2 className="text-xl font-medium mb-4">Return Request Process</h2>
                        <p>Information about return policies and procedures would go here.</p>
                    </div>
                );
            case 'rate-product':
                return (
                    <div>
                        <h2 className="text-xl font-medium mb-4">Rate a Product</h2>
                        <p>Instructions for rating products would be displayed here.</p>
                    </div>
                );
            case 'faqs':
                return (
                    <InteractiveFAQPage />
                );
            default:
                return <div>Select an option from the sidebar</div>;
        }
    };

    const getIcon = (iconName: string) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="18"
                fill="none"
                stroke="currentColor"
            >
                <path d="M4.5 2.125H1.375V17.125H12.625V2.125H9.5M3.25 13.375H10.75M4.5 3.375H9.5L10.125 0.875H3.875L4.5 3.375ZM4.5 11.5L6.375 10.875L10.125 7.125L8.875 5.875L5.125 9.625L4.5 11.5Z" stroke-linejoin="round" />
            </svg>
        );
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className='hidden md:block'>
                <BrandNav isMenuOpen={isMenuOpen} />
            </div>

            <nav className="bg-[#F5F5F5] p-4 border-b hidden md:block">
                <div className="mx-auto flex items-center">
                    <div className="flex space-x-6 ml-[50px]">
                        <a href="#" className="text-gray-500 hover:text-gray-700">
                            Home
                        </a>
                        <img src="/arrow-right.svg" alt="arrow facing right" />
                        <a href="#" className="text-gray-900 font-semibold">
                            Help
                        </a>
                    </div>
                </div>
            </nav>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="relative bg-primary text-white py-16 px-16">
                    {/* Background Image */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: "url('help.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        ></div>
                        {/* Blue Overlay */}
                        <div className="absolute inset-0 bg-primary opacity-90"></div>
                    </div>

                    {/* Content */}
                    <div className="mx-auto relative">
                        <h1 className="text-[20px] font-medium">Help Center</h1>
                        <h2 className="text-[32px] font-bold mt-1">We are here to help you!</h2>

                        {/* Search Bar */}
                        <div className="mt-8 max-w-md">
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="py-3 bg-[#D9D9D9] block w-full pl-10 text-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="mx-auto py-6 px-4 md:px-32 md:py-16">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Mobile Back Button - Only shown when content is active on mobile */}
                        {showContentOnMobile && (
                            <button
                                className="flex items-center mb-4 text-primary font-medium md:hidden"
                                onClick={handleBackClick}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                >
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                Back to Help Topics
                            </button>
                        )}

                        {/* Sidebar - Hidden on mobile when content is showing */}
                        <div className={`w-full md:w-64 flex-shrink-0 ${showContentOnMobile ? 'hidden md:block' : 'block'}`}>
                            <div className="space-y-1">
                                {sidebarItems.map((item) => (
                                    <button
                                        key={item.id}
                                        className={`flex items-center px-[30px] py-[30px] text-[16px] font-semibold w-full text-left rounded-[8px] ${activeItem === item.id
                                            ? 'bg-primary text-white font-medium border-r-[3px] border-l-[3px] border-[#FFC300]'
                                            : 'bg-[#E3E6EA] text-[#3D3D3D] hover:bg-gray-300 border-r-[3px] border-l-[3px] border-primary'
                                            }`}
                                        onClick={() => handleSidebarItemClick(item.id)}
                                    >
                                        <span className="mr-3">{getIcon(item.icon)}</span>
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Area - Hidden on mobile when sidebar is showing */}
                        <div className={`flex-1 ${showContentOnMobile ? 'block' : 'hidden md:block'}`}>
                            <h1 className="text-xl font-bold mb-6">
                                {sidebarItems.find(item => item.id === activeItem)?.title}
                            </h1>
                            <div className='bg-white p-6 border border-gray-200 rounded-md'>
                                {getContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HelpCenter;