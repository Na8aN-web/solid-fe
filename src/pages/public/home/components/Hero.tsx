import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store';
import { fetchCategories } from '../../../../store/slices/categoriesSlice';
import SearchFilter from '../../../../components/SearchFilter';

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
                   
                <SearchFilter />
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