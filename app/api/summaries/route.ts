import connectToDatabase from '@/lib/mongodb'
import { summaryModel } from '@/model/summaryModel'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'


export const GET= async(req: NextRequest)=>{

    const userid = req.nextUrl.searchParams.get('userid');
    console.log({userid})

    await connectToDatabase()
    const summaries = await summaryModel.find({userid:userid}).sort({createdAt:-1}).limit(20)
    return NextResponse.json({success:true, message:"fetched summaries", data:summaries})
    //


  
}


