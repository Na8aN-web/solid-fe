import React, { useState } from 'react';

interface HeroSectionProps {
    // You can add any props you need here
    onSearch?: (query: string, category: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchQuery, selectedCategory);
        }
    };

    return (
        <div className="w-full bg-white py-8 md:py-12 font-roboto">
            <div className="mx-auto p-6 w-full">
                <div className="flex flex-col items-center text-center mb-8">
                    <h1 className="text-[32px] md:text-[40px] w-full md:w-[630px] leading-tight font-semibold mb-4">
                        Your One-Stop Platform for Quality Automotive <span className="text-[#FFC300]">Spare Parts</span>
                    </h1>


                    <p className="text-gray-600 my-4 text-[16px] md:text-lg w-full md:w-[600px]">
                        Find the right parts for cars, trucks, and tractors from trusted manufacturers and suppliers.
                    </p>
                </div>

                <div className="w-full max-w-3xl mx-auto mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-1 flex-col md:flex-row">
                            <div className="hidden md:flex justify-between items-center w-full md:w-44 h-12 border border-gray-300 md:border-r-0 rounded-lg md:rounded-r-none md:rounded-l-lg bg-white px-4 cursor-pointer">
                                <p className="text-sm text-gray-700">{selectedCategory}</p>
                                <img src="/arrowdown.png" alt="arrow-down" className="w-3 h-3" />
                            </div>

                            <div className="relative flex-1 mt-4 md:mt-0">
                                <img
                                    src="/search.png"
                                    alt="search"
                                    className="absolute top-4 left-5 w-5 h-5"
                                />
                                <input
                                    type="text"
                                    className="border border-gray-300 h-12 w-full p-2 rounded-lg md:rounded-l-none md:rounded-r-lg text-sm pl-12"
                                    placeholder="Search by part name or OEM number"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSearch}
                            className="hidden md:block h-12 rounded-lg bg-primary hover:bg-blue-800 text-white px-8 text-base font-semibold transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Auto Parts Images */}
                <div className="w-full overflow-x-hidden">
                    <div className="min-w-[1024px] relative left-1/2 transform -translate-x-1/2">
                        <img
                            src='/hero-image.png'
                            className='w-full'
                            alt='image of several cars and engines'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;