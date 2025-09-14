import React from 'react'

const Pricingsection = () => {
  return (
<div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Choose Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Plan
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Get started with the perfect plan for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Basic</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-800">$9</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">Perfect for individuals getting started</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">5 PDF summaries per month</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Basic summary format</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Email support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Up to 10 pages per PDF</span>
                </li>
              </ul>
              
              <a href='https://buy.stripe.com/test_00waEW11scr0eVh8aWf7i00'  className="w-full bg-gray-800 text-white p-2 rounded-full font-semibold hover:bg-gray-900 transition-colors duration-200">
                Get Started
              </a >
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white relative transform hover:scale-105 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-pink-100">/month</span>
                </div>
                <p className="text-pink-100">For professionals and power users</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <span>Unlimited PDF summaries</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <span>Advanced summary formats</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <span>Unlimited pages per PDF</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <span>Export to multiple formats</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <span>API access</span>
                </li>
              </ul>
              
              <a href="https://buy.stripe.com/test_9B600i5hI0IieVh9f0f7i01" className="w-full bg-white text-purple-600 p-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
                Start Premium
              </a>
            </div>
          </div>
        </div>
      )
}

export default Pricingsection