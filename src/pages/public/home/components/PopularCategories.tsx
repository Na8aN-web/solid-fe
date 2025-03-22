import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const PopularCategories = () => {
    const categories = [
        {
            title: 'Body Parts',
            image: '/popular1.png',
            subcategories: ['Bumpers', 'Doors', 'Fenders', 'Mirrors'],
        },
        {
            title: 'Electronics',
            image: '/popular2.png',
            subcategories: ['Amplifiers', 'Instllation Parts', 'Speakers', 'Stereos'],
        },
        {
            title: 'Steering System',
            image: '/popular3.png',
            subcategories: ['Amplifiers', 'Instllation Parts', 'Speakers', 'Stereos'],
        },
        {
            title: 'Performance Parts',
            image: '/popular4.png',
            subcategories: ['Air Intake Systems', 'Engine Components', 'Exhaust System', 'Performance Chips'],
        },
        {
            title: 'Repair Parts',
            image: '/popular5.png',
            subcategories: ['Brake Parts', 'Engine Parts', 'Exhaust Parts', 'Fuel Delivery'],
        },
        {
            title: 'Wheels & Tyres',
            image: '/popular6.png',
            subcategories: ['Lug Nuts & Locks', 'Tyre Chains', 'Tyres', 'Wheel Covers'],
        },
    ];

    return (
        <div className=" mx-auto py-[20px] px-[20px] md:px-[80px]">
            <div className="flex items-center justify-between mb-8 font-roboto">
                <h2 className="text-[20px] md:text-[24px] font-semibold flex items-center text-[#3D3D3D] font-roboto">
                    <img src="/double-right.png" alt='double right arrow' />
                    <span>Popular Categories</span>
                </h2>
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <div key={index} className="bg-white p-4 border rounded-lg shadow-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-1/2">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="object-contain"
                                />
                            </div>
                            <div className="w-1/2">
                                <h3 className="font-bold mb-2 text-[14px] text-[#2D2828]">{category.title}</h3>
                                <ul className="space-y-1">
                                    <>
                                        {category.subcategories.map((subcat, i) => (
                                            <li key={i} className="text-sm text-[#2D2828]">
                                                {subcat}
                                            </li>
                                        ))}
                                        <div className=" pt-2">
                                            <a
                                                href="#"
                                                className="inline-flex items-center text-sm font-medium text-blue-800"
                                            >
                                                View All
                                                <img src='/arrowrightsm.png' className=" ml-1" />
                                            </a>
                                        </div>
                                    </>
                                </ul>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;