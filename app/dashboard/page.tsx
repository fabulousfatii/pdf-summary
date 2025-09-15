"use client"
import React, { useEffect, useState } from 'react';
import { FileText, Calendar, Download, Trash2, Eye, MoreVertical, Search, Filter } from 'lucide-react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import Link from 'next/link';
import DowloadSummaryButton from '@/components/DowloadSummaryButton';
import { DeleteSummary } from '@/lib/summariesFunction';

interface Summary {
  _id: string;
  title: string;
  fileName: string;
  createdAt: string;
  summaryText: string;
  status: 'completed' | 'processing' | 'failed';
}

export default function Dashboard() {
  const [summaries, setSummaries] = useState<Summary[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

   const { data: session } = useSession()
    const user: User = session?.user
    const userid=user?.id as string

  useEffect(() => {
    const fetchSummaries = async () => {
      if (!userid) {
        console.log("userid is not defined yet");
        return;
      }
      console.log("Fetching summaries for userid:", userid);
      try {
        const response = await axios.get("/api/summaries", { params: { userid } });
        setSummaries(response.data.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    };
    fetchSummaries();
  }, [userid]);

   

  const deleteSummary = async (id: string) => {
    setSummaries(prev => prev.filter(summary => summary?._id !== id));
     await DeleteSummary(id)
    setShowDeleteModal(null);
  };

  const filteredSummaries = summaries.filter(summary => 
    summary?.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    summary?.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span className="w-4 h-4 rounded-full bg-pink-400"></span>
            <span>Powered by AI</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Summaries
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Manage and access all your PDF summaries in one place
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link href="/upload" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Upload New PDF
              </Link >
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search summaries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Filter</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-gray-800">{summaries.length}</div>
            <div className="text-sm text-gray-600">Total Summaries</div>
          </div>
         
         
        
        </div>

        {/* Summaries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSummaries.map((summary) => (
            <div key={summary?._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                      {summary?.fileName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <FileText className="w-4 h-4" />
                      <span className="truncate">{summary?.fileName}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  {getStatusBadge(summary?.status || '')}
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(summary?.createdAt || '')}</span>
                  </div>
                </div>
              </div>

            

              {/* Card Actions */}
              <div className="px-6 pb-6">
                <div className="flex gap-2">
            
                    <>
                      <Link href={`/summary/${summary._id}`} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                      <DowloadSummaryButton title={summary.fileName} summaryText={summary.summaryText} createdAt={summary.createdAt} />
                      <button 
                        onClick={() => setShowDeleteModal(summary?._id || '')}
                        className="bg-red-50 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSummaries.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>




            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm ? 'loading your' : 'No summaries yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Upload your first PDF to get started with AI-powered summaries'
              }
            </p>
            {!searchTerm && (
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Upload Your First PDF
              </button>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Delete Summary
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to delete this summary? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteSummary(showDeleteModal)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}