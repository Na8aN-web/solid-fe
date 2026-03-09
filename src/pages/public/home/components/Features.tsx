import React from 'react';

// TypeScript interfaces
interface FeatureProps {
    icon: React.ReactNode;
    text: string;
    subText?: string;
}

interface SectionProps {
    title: string;
    icon: React.ReactNode;
    features: FeatureProps[];
}

const Feature: React.FC<FeatureProps> = ({ icon, text, subText }) => {
    return (
        <div className="flex flex-col items-center text-center">
            <div className='mb-4 flex items-center gap-2'>
                <div>
                    <img src="/note.png" alt="note icon" className="w-full h-full object-contain" />
                </div>
                <div>
                    <p className="text-sm font-medium text-left text-[#2D2828]">{text}</p>
                    {subText && <p className="text-xs text-left text-[#827E7E]">{subText}</p>}
                </div>
            </div>
            <div className="mb-2">
                {icon}
            </div>
        </div>
    );
};

const Section: React.FC<SectionProps> = ({ title, icon, features }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center font-roboto w-full">
            <div className="mb-4">{icon}</div>
            <h2 className="text-[24px] font-semibold mb-6">{title}</h2>
            <div className="grid grid-cols-3 gap-6 w-full">
                {features.map((feature, index) => (
                    <Feature key={index} {...feature} />
                ))}
            </div>
        </div>
    );
};

const ManufacturerIcon = () => (
    <img src="/manufacturer.png" alt="Manufacturers" className="w-full h-full object-contain" />
);

const BulkBuyersIcon = () => (
    <img src="/bulk.png" alt="Bulk buyers" className="w-full h-full object-contain" />
);

const ListProductsIcon = () => (
    <img src="/manufacturer1.png" alt="List products" className=" object-contain" />
);

const ConnectBuyersIcon = () => (
    <img src="/manufacturer2.png" alt="Connect buyers" className="object-contain" />
);

const ExpandReachIcon = () => (
    <img src="/manufacturer3.png" alt="Expand reach" className="object-contain" />
);

const CompetitivePricingIcon = () => (
    <img src="/bulk1.png" alt="Competitive pricing" className="object-contain" />
);

const DiscountsIcon = () => (
    <img src="/bulk2.png" alt="Volume discounts" className="object-contain" />
);

const ManageOrdersIcon = () => (
    <img src="/bulk3.png" alt="Manage orders" className="object-contain" />
);

const Features: React.FC = () => {
    const manufacturerFeatures: FeatureProps[] = [
        {
            icon: <ListProductsIcon />,
            text: 'List Your Products',
            subText: 'List Your Products'
        },
        {
            icon: <ConnectBuyersIcon />,
            text: 'Connect Your Buyers',
            subText: 'List Your Products'
        },
        {
            icon: <ExpandReachIcon />,
            text: 'Expand Your Reach',
            subText: 'List Your Products'
        }
    ];

    const bulkBuyerFeatures: FeatureProps[] = [
        {
            icon: <CompetitivePricingIcon />,
            text: 'Access great pricing',
            subText: 'List Your Products'
        },
        {
            icon: <DiscountsIcon />,
            text: 'Volume Discounts',
            subText: 'List Your Products'
        },
        {
            icon: <ManageOrdersIcon />,
            text: 'Manage Orders Easily',
            subText: 'List Your Products'
        }
    ];

    return (
        <div className="relative w-full py-[20px] md:py-[40px] px-4 md:px-[80px] font-roboto">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50 bg-primary/20"
            />

            {/* Overlay with the specified color */}
            <div className="absolute inset-0 bg-[#00336633]" />

            {/* Content */}
            <div className="relative container mx-auto">
                <div className="flex items-center mb-6">
                    <div className="text-[#3D3D3D] font-bold text-[20px] md:text-[24px] flex items-center">
                        <img src="/double-right.png" alt='double right arrow' />
                        Manufacturer and Bulk buyers Features
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Section
                        title="Manufacturers"
                        icon={<ManufacturerIcon />}
                        features={manufacturerFeatures}
                    />
                    <Section
                        title="Bulk buyers"
                        icon={<BulkBuyersIcon />}
                        features={bulkBuyerFeatures}
                    />
                </div>
            </div>
        </div>
    );
};

export default Features;