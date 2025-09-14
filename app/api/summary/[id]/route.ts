import connectToDatabase from '@/lib/mongodb'
import { summaryModel } from '@/model/summaryModel'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'


export const GET= async(req: NextRequest,{ params }: { params: { id: string } })=>{

   try {
  const { id } =  params; 
     await connectToDatabase()
     const summary = await summaryModel.findOne({_id:id})
     return NextResponse.json({success:true, message:"fetched summaries", data:summary})
   } catch (error) {
    console.log(error)
   }
   
  
}
export const DELETE= async(req: NextRequest,{ params }: { params: { id: string } })=>{

   try {
  const { id } =  params;
     await connectToDatabase()
     const deletedSummary = await summaryModel.findOneAndDelete({_id:id})
     if (!deletedSummary) {
       return NextResponse.json({success:false, message:"Summary not found"}, {status: 404})
     }
     return NextResponse.json({success:true, message:"Summary deleted successfully", data:deletedSummary})
   } catch (error) {
    console.log(error)
    return NextResponse.json({success:false, message:"Error deleting summary"}, {status: 500})
   }


}



