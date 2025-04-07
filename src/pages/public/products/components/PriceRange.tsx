// PriceRangeSlider.tsx
import React, { useState, useRef, useEffect } from 'react';

interface PriceRangeSliderProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (prices: { minPrice: number; maxPrice: number }) => void;
  minLimit?: number;
  maxLimit?: number;
  currency?: string;
}

const PriceRange: React.FC<PriceRangeSliderProps> = ({ 
  minPrice, 
  maxPrice, 
  onPriceChange,
  minLimit = 100,
  maxLimit = 200000,
  currency = "₦"
}) => {
    const [sliderValues, setSliderValues] = useState({
        min: 0,  // Percentage position (0-100)
        max: 100 // Percentage position (0-100)
    });
    
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingMin = useRef<boolean>(false);
    const isDraggingMax = useRef<boolean>(false);
    
    // Initialize slider positions based on price values
    useEffect(() => {
        const minPercent = calculatePercentage(minPrice, minLimit, maxLimit);
        const maxPercent = calculatePercentage(maxPrice, minLimit, maxLimit);
        setSliderValues({ min: minPercent, max: maxPercent });
    }, [minPrice, maxPrice, minLimit, maxLimit]);
    
    // Calculate percentage position from price
    const calculatePercentage = (value: number, min: number, max: number): number => {
        return ((value - min) / (max - min)) * 100;
    };
    
    // Calculate price from percentage position
    const calculatePrice = (percent: number, min: number, max: number): number => {
        return Math.round(((max - min) * (percent / 100)) + min);
    };
    
    // Handle mouse down on sliders
    const handleMouseDown = (event: React.MouseEvent, handle: 'min' | 'max'): void => {
        if (handle === 'min') {
            isDraggingMin.current = true;
        } else {
            isDraggingMax.current = true;
        }
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        // Prevent text selection while dragging
        event.preventDefault();
    };
    
    // Handle touch start on sliders
    const handleTouchStart = (event: React.TouchEvent, handle: 'min' | 'max'): void => {
        if (handle === 'min') {
            isDraggingMin.current = true;
        } else {
            isDraggingMax.current = true;
        }
        
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        
        // Prevent scrolling while dragging
        event.preventDefault();
    };
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent): void => {
        if (!isDraggingMin.current && !isDraggingMax.current || !sliderRef.current) return;
        
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const percent = Math.min(Math.max(((event.clientX - sliderRect.left) / sliderRect.width) * 100, 0), 100);
        
        updateSliderPosition(percent);
    };
    
    // Handle touch movement
    const handleTouchMove = (event: TouchEvent): void => {
        if (!isDraggingMin.current && !isDraggingMax.current || !sliderRef.current) return;
        
        const touch = event.touches[0];
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const percent = Math.min(Math.max(((touch.clientX - sliderRect.left) / sliderRect.width) * 100, 0), 100);
        
        updateSliderPosition(percent);
        
        // Prevent scrolling while dragging
        event.preventDefault();
    };
    
    // Update slider position based on drag
    const updateSliderPosition = (percent: number): void => {
        if (isDraggingMin.current) {
            // Don't allow min to go beyond max - 1
            const newMin = Math.min(percent, sliderValues.max - 1);
            setSliderValues(prev => ({ ...prev, min: newMin }));
            
            // Update the minPrice value
            const newPrice = calculatePrice(newMin, minLimit, maxLimit);
            onPriceChange({ minPrice: newPrice, maxPrice });
        } else if (isDraggingMax.current) {
            // Don't allow max to go below min + 1
            const newMax = Math.max(percent, sliderValues.min + 1);
            setSliderValues(prev => ({ ...prev, max: newMax }));
            
            // Update the maxPrice value
            const newPrice = calculatePrice(newMax, minLimit, maxLimit);
            onPriceChange({ minPrice, maxPrice: newPrice });
        }
    };
    
    // Handle mouse up
    const handleMouseUp = (): void => {
        isDraggingMin.current = false;
        isDraggingMax.current = false;
        
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // Handle touch end
    const handleTouchEnd = (): void => {
        isDraggingMin.current = false;
        isDraggingMax.current = false;
        
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };
    
    // Format price with commas
    const formatPrice = (price: number): string => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    return (
        <div className="mb-4 font-roboto">
            <div className="relative pt-5 pb-2">
                <div 
                    ref={sliderRef}
                    className="h-1 bg-gray-300 rounded-full"
                >
                    <div
                        className="absolute h-1 bg-primary rounded-full"
                        style={{
                            left: `${sliderValues.min}%`,
                            right: `${100 - sliderValues.max}%`
                        }}
                    ></div>
                    <div 
                        className="absolute h-4 w-4 bg-primary rounded-full -mt-1.5 cursor-pointer"
                        style={{ left: `${sliderValues.min}%` }}
                        onMouseDown={(e) => handleMouseDown(e, 'min')}
                        onTouchStart={(e) => handleTouchStart(e, 'min')}
                    ></div>
                    <div 
                        className="absolute h-4 w-4 bg-primary rounded-full -mt-1.5 cursor-pointer"
                        style={{ left: `${sliderValues.max}%` }}
                        onMouseDown={(e) => handleMouseDown(e, 'max')}
                        onTouchStart={(e) => handleTouchStart(e, 'max')}
                    ></div>
                </div>
            </div>
            
            <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-[10px] text-gray-500">{currency}</span>
                    <input
                        type="number"
                        className="w-full py-2 pl-8 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={minPrice}
                        onChange={(e) => {
                            const newMinPrice = Math.max(minLimit, Math.min(+e.target.value, maxPrice - 1));
                            onPriceChange({ minPrice: newMinPrice, maxPrice });
                        }}
                    />
                </div>
                <div className="flex items-center">—</div>
                <div className="relative flex-1">
                    <span className="absolute left-3 top-[10px] text-gray-500">{currency}</span>
                    <input
                        type="number"
                        className="w-full py-2 pl-8 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={maxPrice}
                        onChange={(e) => {
                            const newMaxPrice = Math.min(maxLimit, Math.max(+e.target.value, minPrice + 1));
                            onPriceChange({ minPrice, maxPrice: newMaxPrice });
                        }}
                    />
                </div>
            </div>
            
            <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{currency}{formatPrice(minLimit)}</span>
                <span>{currency}{formatPrice(maxLimit)}</span>
            </div>
        </div>
    );
};

export default PriceRange;