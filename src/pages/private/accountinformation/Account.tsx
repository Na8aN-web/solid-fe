import React, { useState } from 'react'
import Navbar from './components/Navbar'
import BrandNav from '../home/components/BrandNav';
import Recents from './components/Recents';
import AccountInformation from './components/AccountInformation';

const Account = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div>
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className='hidden md:block'><BrandNav isMenuOpen={isMenuOpen} /></div>
            <nav className="bg-[#F5F5F5] p-4 border-b hidden md:block">
                <div className="mx-auto flex items-center">
                    <div className="flex space-x-6 ml-[50px]">
                        <a href="#" className="text-gray-500 hover:text-gray-700">Home</a>
                        <img src="/arrow-right.svg" alt="arrow facing right" />
                        <a href="#" className="text-gray-900 font-semibold">Profile</a>
                    </div>
                </div>
            </nav>

            <AccountInformation />
            <div className='my-12 px-4 md:px-16 hidden md:block'>
                <Recents />
            </div>

        </div>
    )
}

export default Account