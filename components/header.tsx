"use client"

import React, { useState,  } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import { User } from "next-auth";


const Header = () => {
//   const router = useRouter();
const pathname= usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const router = useRouter()

const { data: session } = useSession()
    const user: User = session?.user
    const userid=user?.id as string

    
 

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashbord', href: '/dashboard' },
    { name: 'upload', href: '/upload' },
  ];

  const isActive = (path:string) => pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Sommaire</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
                {/* Active page indicator with animation */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform transition-transform duration-300 ${
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
                {/* Hover effect */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300 transform scale-x-0 transition-transform duration-300 hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* AI Badge */}
            <div className="flex items-center space-x-1 px-3 py-1 bg-pink-50 border border-pink-200 rounded-full">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-pink-700">Powered by AI</span>
            </div>
            
              {userid ? (
                <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                  Logout
                  </button>) :(
                    <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                  Sign in
                </button>
                  )
                 }
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <div className="pt-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 px-3 py-1 bg-pink-50 border border-pink-200 rounded-full">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-pink-700">Powered by AI</span>
                </div>
                
                {userid ? (
                <Link href={"/"} className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                  Logout
                  </Link>) :(
                    <Link href={"/signin"} className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                  Sign in
                </Link>
                  )
                 }
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;