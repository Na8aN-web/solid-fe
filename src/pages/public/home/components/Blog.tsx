import React from 'react';

// TypeScript interface for blog data
interface BlogPost {
    id: number;
    title: string;
    date: string;
    image: string;
    excerpt: string;
}

interface FeatureItem {
    iconSrc: string;  // Path to icon image
    title: string;
    description: string;
}

const VehicleBlogPage: React.FC = () => {
    // Blog post data
    const blogPosts: BlogPost[] = [
        {
            id: 1,
            title: "Getting the Best For Your Vehicle",
            date: "October 11, 2024",
            image: "/blog1.png",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: 2,
            title: "Getting the Best For Your Vehicle",
            date: "October 11, 2024",
            image: "/blog2.png",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: 3,
            title: "Getting the Best For Your Vehicle",
            date: "October 11, 2024",
            image: "/blog3.png",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: 4,
            title: "Getting the Best For Your Vehicle",
            date: "October 11, 2024",
            image: "/blog4.png",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    ];

    const featureItems: FeatureItem[] = [
        {
            iconSrc: "/delivery.png",
            title: "Fast Delivery",
            description: "Nationwide quick delivery"
        }, {
            iconSrc: "/returns.png",
            title: "Easy Returns",
            description: "Free returns anytime"
        },
        {
            iconSrc: "/support.png",
            title: "Support 24/7",
            description: "Online 24 hours"
        },
        {
            iconSrc: "/payment.png",
            title: "Payment Method",
            description: "Secure payment"
        }
        // ...etc
    ];

    return (
        <div className="font-roboto mx-auto py-[20px] px-[20px] md:px-[80px]">
            {/* Latest Blogs Header */}
            <div className="flex items-center mb-6">
                <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
                <h2 className="text-[20px] md:text-[24px] font-bold text-gray-800">Latest Blogs</h2>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {blogPosts.map((post) => (
                    <div key={post.id} className="flex flex-col">
                        <div className="overflow-hidden mb-4">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex items-center mb-2">
                            <CalendarIcon className="w-4 h-4 text-primary mr-2" />
                            <span className="text-sm text-primary">{post.date}</span>
                        </div>
                        <h3 className="font-bold text-[16px] text-[#2D2828] mb-2">{post.title}</h3>
                        <p className="text-sm text-[#827E7E] mb-4 flex-grow">{post.excerpt}</p>
                        <button className="flex items-center border border-primary text-primary px-[20px] py-[16px] rounded w-fit text-sm">
                            Read More
                            <PlusIcon className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Feature Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 border">
                {featureItems.map((item, index) => (
                    <div key={index} className="flex items-center p-4 rounded">
                        <div className="bg-white p-3 rounded-lg mr-4 flex items-center justify-center">
                            <img
                                src={item.iconSrc}
                                alt={item.title}
                                className=""
                            />
                        </div>
                        <div>
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Icons Components
const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

// const DeliveryIcon: React.FC = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
//     </svg>
// );

// const ReturnsIcon: React.FC = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//     </svg>
// );

// const SupportIcon: React.FC = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
//     </svg>
// );

// const PaymentIcon: React.FC = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//     </svg>
// );

export default VehicleBlogPage;