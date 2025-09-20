

import SummaryCard from "@/components/SummaryCard";
import { fetchSummary } from "@/lib/summariesFunction";

export default async  function SummaryPage(props: { params: { id: string } }) {

    
    const params = await props.params;
    const id = params.id

if (!id) {
        console.log("userid is not defined yet");
        return;}
       
    const summary=  await fetchSummary(id)


    return(
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
                  Summary
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Manage and access all your PDF summaries in one place
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Update 
              </button>
            </div>
          </div>
        </div>

        {/* Summary Card */}
       {summary ? (
            <div key={summary.data._id} className="bg-white w-full rounded-lg shadow-lg p-15 mx- border border-gray-200 mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">{summary.data.fileName}</h2>
              <p className="font-extrabold mb-4 leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Date: {summary.data.createdAt}</p>
              <p className="text-sm text-gray-500"></p>
               <SummaryCard summary={summary.data.summaryText}/>
              
            </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <p className="text-gray-600">Loading summary...</p>
          </div>
        )}

        </div>
        </div>
    
)
}

