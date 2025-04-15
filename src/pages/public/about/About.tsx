import { useState } from 'react';
import Navbar from './components/LandingNavbar';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import CoreValues from './components/CoreValues';

export default function About() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you for subscribing with ${email}!`);
        setEmail('');
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header/Navigation */}
            <Navbar />

            <main className="flex-grow">
                {/* Hero Banner */}
                <section
                    className="py-16 relative bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/about.png')",
                        minHeight: "300px"
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm bg-[#FFC300] md:w-[400px] p-[20px] text-[18px] text-center font-semibold"><a href="#">About Us</a> - Solid Spare Parts</p>
                            <h1 className="text-3xl py-6 md:text-[40px] font-semibold text-white">Driving Reliability: Your Trusted Partner for Quality <span className='text-[#FFC300]'> Spare Parts</span></h1>
                        </div>
                    </div>
                </section>


                {/* Powering the Future Section */}
                <section className="py-10 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-[40px] font-bold text-center text-primary my-6">Powering the Future of Spare Parts<div className='md:mt-4'>— Fast, Reliable, and Seamless</div></h2>
                        <p className="text-center text-[#5E5E5E] my-10">Find the right parts for cars, trucks, and tractors from trusted <div>manufacturers and suppliers.</div></p>

                        <div className=" gap-6">
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <img src="/aboutdesc.png" alt="Engine Pistons" className="w-full object-cover" />
                            </div>
                          
                        </div>
                    </div>
                </section>

                {/* Meet Our Leaders */}
                <section className="py-12 bg-[#0033660D]">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10">Meet Our Leaders</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: "Anthony Joshua", position: "CEO/Founder", image: "leaders.png" },
                                { name: "Matthew Cutts", position: "COO/Partner", image: "leaders.png" },
                                { name: "Chibuzo Okeke", position: "CTO/Co-Founder", image: "leaders.png" },
                                { name: "Marty Cash", position: "CFO/Partner", image: "leaders.png" }
                            ].map((leader, index) => (
                                <div key={index} className="text-center">
                                    <div className="rounded-lg overflow-hidden mb-3">
                                        <img src={leader.image} alt={leader.name} className="w-full  object-cover" />
                                    </div>
                                    <h4 className="font-bold text-left text-[18px] text-primary">{leader.name}</h4>
                                    <p className="text-[#5E5E5E] text-left text-[14px]">{leader.position}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Introduction */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="inline-block bg-[#FFC300] text-black font-medium px-[40px] py-[20px] rounded-md mb-4">Introduction</div>
                                <h2 className="text-2xl md:text-[40px] my-4 block font-semibold text-primary mb-4 md:leading-[50px]">Connecting You to the Best Automotive Spare Parts, Anytime, Anywhere</h2>
                                <p className="text-primary text-[20px] mb-4">
                                    At Solid Spare Parts, we are revolutionizing the way automotive spare parts are sourced, purchased, and delivered. Our platform connects vehicle owners, mechanics, fleet managers, and businesses with leading manufacturers in a seamless marketplace designed for efficiency, reliability, and affordability.
                                </p>
                                <p className="text-primary text-[20px] ">
                                    Whether you're looking for individual parts in bulk, entire fix packages, we provide a trusted one-stop solution for all spare parts requirements.
                                </p>
                            </div>
                            <div className="order-1 lg:order-2">
                                <img src="/api/placeholder/500/300" alt="Auto Parts Shop" className="rounded-lg shadow-lg w-full" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Mission */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <div className=" gap-4">
                                    <img src="/aboutmission.png" alt="Engine Parts" className="rounded-lg shadow-md w-full object-cover" />
                                </div>
                            </div>
                            <div>
                                <div className="inline-block bg-[#FFC300] text-black font-medium px-[40px] py-[20px] rounded-md mb-4">Our Mission</div>
                                <h2 className="text-2xl md:text-[40px] font-semibold text-primary mb-4 md:leading-[50px]">Simplifying Spare Parts Sourcing with Efficiency and Trust</h2>
                                <p className="text-primary text-[20px]">
                                    To provide a fast, transparent, and efficient platform where buyers and sellers of automotive spare parts can connect easily, ensuring the highest quality products and reliable delivery services.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Vision */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <div className="inline-block bg-[#FFC300] text-black font-medium px-[40px] py-[20px] rounded-md mb-4">Our Vision</div>
                                <h2 className="text-2xl md:text-[40px] font-semibold text-primary mb-4 md:leading-[50px]">Building the Largest and Most Trusted Spare Parts Marketplace</h2>
                                <p className="text-primary text-[20px]">
                                    To become the leading digital marketplace for automotive spare parts, empowering individuals and businesses with easy access to genuine and high-performance vehicle components across Nigeria and beyond.
                                </p>
                            </div>
                            <div>
                                <img src="/api/placeholder/500/300" alt="Warehouse of Parts" className="rounded-lg shadow-lg w-full" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <CoreValues />

                {/* Commitment & Join Us */}
                <section className="py-12 bg-[#F3F3F3]">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-[#0033661A] p-[40px] rounded-lg">
                                <h3 className="text-[24px] font-bold text-primary mb-4">Our Commitment</h3>
                                <p className="text-primary text-[16px] mb-4">
                                    We are dedicated to making vehicle maintenance and repairs easier than ever by providing a trustworthy, efficient, and technology-driven platform for spare parts procurement. Whether you need to overhaul a single brake drum or a bulk distributor, experience seamless transactions and outstanding satisfaction.
                                </p>
                            </div>

                            <div className=" p-6 rounded-lg">
                                <h3 className="text-[24px] font-bold text-primary mb-4">Join Us Today!</h3>
                                <p className="text-primary text-[16px] mb-4">
                                    Become part of the Solid Spare Parts community and experience the future of automotive maintenance. Whether you're a buyer or seller, we have the right solution for you.
                                </p>

                                <div className="flex mt-12 flex-col sm:flex-row gap-3">
                                    <button className="bg-primary text-white px-4 py-2 text-[16px] rounded-[12px] hover:bg-blue-900">Sign Up Now</button>
                                    <button className="bg-transparent border border-primary text-primary px-4 py-2 text-[16px] rounded-[12px] hover:bg-gray-300">Browse Products</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}