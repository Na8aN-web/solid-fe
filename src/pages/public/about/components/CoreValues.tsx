import React from 'react';
import { ArrowRight } from 'lucide-react';

const CoreValues = () => {
    return (
        <div className="mx-auto px-[20px] md:px-[80px] py-[30px] font-roboto">
            <h2 className="text-[20px] md:text-[24px] font-semibold flex items-center mb-16">
                <img src="/double-right.png" alt="double right arrow" />
                <span>Our Core Values</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Wide Product Range */}
                <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6">
                    <div className="flex items-left justify-start mb-4">
                        <img src="/values1.png" alt="why pick solid" />
                    </div>
                    <h3 className="text-primary font-bold mb-2">Reliability</h3>
                    <p className="text-[12px] text-primary mb-4">
                        We ensure that every product and transaction on our platform meets high standards of quality and trust.
                    </p>

                </div>

                {/* Bulk Ordering Options - Pushed Up */}
                <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6 relative md:bottom-12">
                    <div className="flex items-left justify-start mb-4">
                        <img src="/values2.png" alt="why pick solid" />
                    </div>
                    <h3 className="text-primary font-bold mb-2">Innovation</h3>
                    <p className="text-[12px] text-primary mb-4">
                        We leverage technology to enhance the spare parts buying and selling experience, making it smarter and more convenient.
                    </p>
                </div>

                {/* Direct Manufacturer Access */}
                <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6">
                    <div className="flex items-left justify-start mb-4">
                        <img src="/values3.png" alt="why pick solid" />
                    </div>
                    <h3 className="text-primary font-bold mb-2">Efficiency</h3>
                    <p className="text-[12px] text-primary mb-4">
                        Our seamless system simplifies the process of finding, ordering, and receiving spare parts quickly.
                    </p>
                </div>

                {/* Secure Payments */}
                <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6">
                    <div className="flex items-left justify-start mb-4">
                        <img src="/values4.png" alt="why pick solid" />
                    </div>
                    <h3 className="text-primary font-bold mb-2">Customer-Centricity</h3>
                    <p className="text-[12px] text-primary mb-4">
                        Our platform is designed with the needs of individuals, bulk buyers, and manufacturers in mind, ensuring the best user experience.
                    </p>
                </div>

                {/* Fast Delivery - Pushed Up */}
                <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6 relative md:bottom-12">
                    <div className="flex items-left justify-start mb-4">
                        <img src="/values5.png" alt="why pick solid" />
                    </div>
                    <h3 className="text-primary font-bold mb-2">Transparency</h3>
                    <p className="text-[12px] text-primary mb-4">
                        We provide clear pricing, honest product descriptions, and real-time tracking for all transactions.
                    </p>
                </div>

                {/* User-Friendly Interface */}
                <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6">
                    <div className="flex items-left justify-start mb-4">
                        <img src="/values6.png" alt="why pick solid" />
                    </div>
                    <h3 className="text-primary font-bold mb-2">Collaboration</h3>
                    <p className="text-[12px] text-primary mb-4">
                        We build strong relationships between manufacturers, wholesalers, and customers, creating a marketplace where everyone thrives.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default CoreValues;
