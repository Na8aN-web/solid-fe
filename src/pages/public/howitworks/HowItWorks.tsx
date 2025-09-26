import React, { useState } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface TabData {
  id: string;
  label: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
}

interface StepsDataType {
  [key: string]: Step[];
}

const HowItWorks: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('subdistributors');

    const tabs: TabData[] = [
        { id: 'mechanics', label: 'Mechanics/\nIndividuals' },
        { id: 'subdistributors', label: 'Sub-distributors/\nBulk buyers' },
        { id: 'importers', label: 'Importers' },
        { id: 'manufacturers', label: 'Manufacturers' }
    ];

    // Featured products data
    const featuredProducts: Product[] = [
        { id: 1, name: 'Shock Absorber', price: 182.00, oldPrice: 195.00 },
        { id: 2, name: 'Fuel Pump', price: 269.00, oldPrice: 290.00 },
        { id: 3, name: 'Micheline Tyres', price: 309.00, oldPrice: 330.00 },
        { id: 4, name: 'Fuel Filter', price: 29.00, oldPrice: 35.00 },
        { id: 5, name: 'Performance Exhaust System', price: 580.00, oldPrice: 610.00 },
        { id: 6, name: 'Radiator', price: 259.00, oldPrice: 280.00 }
    ];

    // Tab-specific steps
    const stepsData: StepsDataType = {
        mechanics: [
            {
                id: 1,
                title: 'Sign Up as a Mechanic',
                description: 'Create an account tailored to your individual repair shop needs'
            },
            {
                id: 2,
                title: 'Find Quality Parts',
                description: 'Browse our catalog with detailed specifications for your repairs'
            },
            {
                id: 3,
                title: 'Order What You Need',
                description: 'Purchase single items or small quantities with fast delivery'
            },
            {
                id: 4,
                title: 'Get Workshop Support',
                description: 'Access technical documentation and get installation guidance'
            },
        ],
        subdistributors: [
            {
                id: 1,
                title: 'Sign Up as a Sub-distributor/Bulk buyer',
                description: 'Create an account tailored to your needs (individual, wholesaler, or manufacturer)'
            },
            {
                id: 2,
                title: 'Browse Products',
                description: 'Use our smart search or filter options to find the right parts.'
            },
            {
                id: 3,
                title: 'Place Your Bulk Order',
                description: 'Add items to your cart and checkout securely'
            },
            {
                id: 4,
                title: 'Track & Receive',
                description: 'Monitor your order in real-time and get timely delivery'
            },
        ],
        importers: [
            {
                id: 1,
                title: 'Register as an Importer',
                description: 'Set up your international business account with custom shipping options'
            },
            {
                id: 2,
                title: 'Access Wholesale Catalog',
                description: 'Browse our complete inventory with international pricing and availability'
            },
            {
                id: 3,
                title: 'Place Large Volume Orders',
                description: 'Set up recurring orders with flexible payment terms'
            },
            {
                id: 4,
                title: 'Manage Customs & Shipping',
                description: 'Track your international shipments with our logistics partners'
            },
        ],
        manufacturers: [
            {
                id: 1,
                title: 'Partner as a Manufacturer',
                description: 'Join our network of trusted OEM and aftermarket manufacturers'
            },
            {
                id: 2,
                title: 'List Your Products',
                description: 'Upload your catalog with detailed specifications and pricing'
            },
            {
                id: 3,
                title: 'Receive Direct Orders',
                description: 'Get notified of new orders and manage your production schedule'
            },
            {
                id: 4,
                title: 'Grow Your Distribution',
                description: 'Access analytics and expand your market reach through our platform'
            },
        ]
    };

    // Get steps for current active tab
    const currentSteps = stepsData[activeTab] || stepsData.subdistributors;

    return (
        <div className="mx-auto py-[20px] px-[20px] md:px-[80px] font-roboto">
            {/* Tabs */}
            <div className="w-full flex justify-center">
                <div className='w-full md:max-w-5xl bg-[#F3F3F3] mb-8 flex justify-center rounded-lg gap-3'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`py-[5px] px-[10px] md:px-[20px] text-center text-[12px] md:text-[20px] whitespace-pre-line ${
                                activeTab === tab.id
                                    ? 'bg-primary text-white rounded-lg'
                                    : 'text-gray-700'
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left side - Laptop with products */}
                <div className="md:w-3/5">
                    <div className="p-2">
                        <img
                            src="/macbook.png"
                            alt="Laptop showing auto parts marketplace"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>

                {/* Right side - How It Works */}
                <div className="md:w-2/5">
                    <h2 className="text-[20px] font-bold mb-4">How It Works</h2>
                    <p className="text-customGray3 text-[14px] w-[319px] my-6">
                        With these simple steps you're one click away from shopping the right parts for your vehicle
                    </p>

                    {/* Steps with connected checkmarks */}
                    <div className="relative">
                        {/* Vertical line connecting checkmarks */}
                        <div className="absolute left-3 top-3 w-0.5 h-[calc(100%-45px)] bg-[#15B70D]"></div>
                        
                        {/* Steps */}
                        <div className="space-y-6">
                            {currentSteps.map((step) => (
                                <div key={step.id} className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1 relative z-10">
                                        <div className="w-6 h-6 bg-[#15B70D] rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{step.title}</h3>
                                        <p className="text-[#919191] text-[14px]">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="bg-primary text-white font-bold py-3 px-6 rounded-lg">
                            Browse Products
                        </button>
                        <button className="border-2 border-primary text-primary font-bold py-3 px-6 rounded-lg">
                            Learn More About Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;