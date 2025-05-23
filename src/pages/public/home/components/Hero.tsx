import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store';
import { fetchCategories } from '../../../../store/slices/categoriesSlice';

interface HeroSectionProps {
    onSearch?: (query: string, category: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.categories);

    // Fetch categories on component mount
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchQuery, selectedCategory);
        }
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setIsCategoryOpen(false);
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
                        <div className="flex flex-1 flex-col md:flex-row relative">
                            {/* Category Dropdown */}
                            <div 
                                className="hidden md:flex justify-between items-center w-full md:w-44 h-12 border border-gray-300 md:border-r-0 rounded-lg md:rounded-r-none md:rounded-l-lg bg-white px-4 cursor-pointer"
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            >
                                <p className="text-sm text-gray-700 truncate">
                                    {loading ? 'Loading...' : error ? 'Error loading' : selectedCategory}
                                </p>
                                <img 
                                    src="/arrowdown.png" 
                                    alt="arrow-down" 
                                    className={`w-3 h-3 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                                />
                                
                                {/* Category Dropdown Menu */}
                                {isCategoryOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                        <div 
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleCategorySelect('All Categories')}
                                        >
                                            All Categories
                                        </div>
                                        {loading ? (
                                            <div className="px-4 py-2 text-gray-500">Loading categories...</div>
                                        ) : error ? (
                                            <div className="px-4 py-2 text-red-500">Error loading categories</div>
                                        ) : (
                                            categories?.map((category) => (
                                                <div 
                                                    key={category._id}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleCategorySelect(category.name)}
                                                >
                                                    {category.name}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Search Input */}
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
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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