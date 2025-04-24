import React, { useState } from 'react';
import Logo from '../../../../assets/logo.png';
import Cart from '../../../../assets/cart.png';
import openMenuIcon from '../../../../assets/menu.png';
import closeMenuIcon from '../../../../assets/cancel.png';

interface NavItem {
    label: string;
    href: string;
}

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        { label: 'Products', href: '/products' },
        { label: 'About Us', href: '/about' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact Us', href: '/contact' },
    ];

    const moreOptions: NavItem[] = [
        { label: 'Help Center', href: '/help' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
    ];

    return (
        <nav className="bg-white shadow-sm font-roboto relative">
            <div className=" mx-auto py-[20px] px-[20px] md:px-[80px]">
                <div className="flex justify-between  items-center">
                    <div className='flex justify-start gap-2'>
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-900 hover:bg-gray-100"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <img
                                    src={isMenuOpen ? closeMenuIcon : openMenuIcon}
                                    alt="Menu"
                                    className="h-4 w-4"
                                />
                            </button>
                        </div>
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/" className="flex items-center">
                                <img
                                    className="h-[32px] md:h-10 md:w-auto w-[120px]"
                                    src={Logo}
                                    alt="Solid Spare Parts Logo"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block border-[1px] border-[#D9D9D9] rounded-[10px] px-[48px] py-[10px] bg-[#F9F9F9]">
                        <div className="flex gap-[64px]">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-customGray1 hover:text-primary text-sm font-medium"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="hidden md:flex gap-1">
                            <img src={Cart} alt="" />
                            <p className="text-[14px] text-[#2D2828] font-roboto">My Cart</p>
                        </div>
                        <div className="hidden md:block">
                            <a href='/login'>
                                <button
                                    type="submit"
                                    className="border border-primary h-12 w-16 rounded-lg bg-white text-primary text-sm font-semibold"
                                >
                                    Log in
                                </button>
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <a href='/account-type'>
                                <button
                                    type="submit"
                                    className="border h-12 w-20 rounded-lg bg-primary text-white text-sm font-semibold"
                                >
                                    Sign up
                                </button>
                            </a>
                        </div>

                        {/* Cart icon for mobile */}
                        <div className="md:hidden flex items-center">
                            <a href="/cart">
                                <img src={Cart} alt="Cart" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-screen Mobile menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white z-50 overflow-y-auto md:hidden">
                    <div className="flex justify-between items-center mx-auto py-[20px] px-[20px] border-b">
                        <div className='flex justify-start gap-2'>
                            {/* Mobile menu button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-900 hover:bg-gray-100"
                                    aria-controls="mobile-menu"
                                    aria-expanded={isMenuOpen}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {/* Menu open: "hidden", Menu closed: "block" */}
                                    <svg
                                        className={`${isMenuOpen ? 'hidden' : 'block'} h-4 w-4`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    {/* Menu open: "block", Menu closed: "hidden" */}
                                    <svg
                                        className={`${isMenuOpen ? 'block' : 'hidden'} h-4 w-4`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <a href="/" className="flex items-center">
                                    <img
                                        className="h-[32px] w-[120px]"
                                        src={Logo}
                                        alt="Solid Spare Parts Logo"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <a href="/cart">
                                <img src={Cart} alt="Cart" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Login/Signup buttons */}
                    <div className="flex p-4 gap-4">
                        <button
                            type="submit"
                            className="border border-primary flex-1 h-12 rounded-lg bg-white text-primary text-sm font-semibold"
                        >
                            Log in
                        </button>
                        <button
                            type="submit"
                            className="border flex-1 h-12 rounded-lg bg-primary text-white text-sm font-semibold"
                        >
                            Sign up
                        </button>
                    </div>

                    {/* Main navigation items */}
                    <div className="px-4 py-2">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="flex items-center justify-between text-gray-700 px-2 py-4 border-b"
                            >
                                <span>{item.label}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        ))}
                    </div>

                    {/* More Options section */}
                    <div className="px-4 py-4">
                        <h3 className="font-medium text-lg mb-2">More Options</h3>
                        {moreOptions.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="block text-gray-600 py-2"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Contact Us section */}
                    <div className="px-4 py-4 border-t">
                        <h3 className="font-medium text-lg mb-2 relative">
                            Contact Us
                            <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#FFC300]"></span>
                        </h3>
                        <div className="py-2 flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC300] mt-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-gray-600">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC300]" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <p className="text-sm text-gray-600">08012300000, 07012345678</p>
                        </div>
                        <div className="py-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC300]" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <p className="text-sm text-gray-600">tanya.hill@example.com</p>
                        </div>
                    </div>

                    {/* Newsletter section */}
                    <div className="px-4 py-4 border-t">
                        <h3 className="font-medium text-lg mb-2">Get The Latest From Us</h3>
                        <p className="text-sm text-gray-600 mb-4">Subscribe to our newsletter to get updates on our latest offers</p>
                        <div className="flex gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 border rounded-l-md p-3 text-sm"
                            />
                            <button className="bg-primary text-white px-4 py-3 rounded-md text-sm">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Social Media section */}
                    <div className="px-4 py-4 border-t">
                        <h3 className="font-medium text-lg mb-4">Join Us On</h3>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-700">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-700">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-700">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-700">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

