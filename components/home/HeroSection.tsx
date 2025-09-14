

// import React, { useState } from 'react';

import Link from "next/link";

export default function HeroSection() {
//   const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span className="w-4 h-4 rounded-full bg-pink-400"></span>
            <span>Powered by AI</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Transform PDFs into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              concise summaries
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Get a beautiful summary text of the document in seconds.
          </p>
          
          <Link href="/dashboard"
            className={`bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transform transition-all duration-200 
            //  isHovered ? 'scale-105 shadow-xl' : ''
            // } hover:from-pink-600 hover:to-red-600
             `}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
          >
            Try Summarize
          </Link>
        </div>
        
        {/* Divider */}
        <div className="flex items-center justify-center my-12">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
            <span className="text-white text-lg">⚡</span>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Watch how Summarize transforms</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">
              this Next.js
            </span>
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">course PDF into an easy-to-read summary!</span>
          </p>
        </div>
        
        {/* Demo PDF Preview */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-12 h-12 bg-red-500 rounded mx-auto mb-2 flex items-center justify-center text-white font-bold">
                  PDF
                </div>
                <p className="text-sm">Next.js Course PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}