import React from 'react';

interface SortSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  onApply: () => void;
}

const SortSidebar: React.FC<SortSidebarProps> = ({
  isOpen,
  onClose,
  sortOrder,
  setSortOrder,
  onApply,
}) => {
  // Sort options
  const sortOptions = [
    { value: 'A - Z', label: 'A - Z' },
    { value: 'Relevance', label: 'Relevance' },
    { value: 'Price: High to Low', label: 'Price - Highest to Lowest' },
    { value: 'Price: Low to High', label: 'Price - Lowest to Highest' },
  ];

  // If the sidebar is not open, don't render anything
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      {/* Sidebar */}
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="font-semibold text-[20px]">Sort</h2>
          </div>
          <button 
            onClick={onApply}
            className="text-[16px] text-primary font-semibold"
          >
            Apply
          </button>
        </div>
        
        {/* Sort Options */}
        <div className="flex-1 overflow-y-auto p-4">
          {sortOptions.map((option) => (
            <div key={option.value} className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortOrder === option.value}
                  onChange={() => setSortOrder(option.value)}
                  className="w-5 h-5 mr-3"
                />
                <span className="text-base">{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SortSidebar;