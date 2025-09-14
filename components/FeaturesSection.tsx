import { CheckCircle, Upload } from 'lucide-react'
import React from 'react'

const FeaturesSection = () => {
  return (
<div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Easy Upload</h4>
              <p className="text-gray-600 text-sm">
                Simply drag and drop or click to upload your PDF files
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">AI</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">AI Processing</h4>
              <p className="text-gray-600 text-sm">
                Advanced AI analyzes and summarizes your documents
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Quick Results</h4>
              <p className="text-gray-600 text-sm">
                Get your summaries in seconds, not minutes
              </p>
            </div>
          </div>  )
}

export default FeaturesSection