"use server"

import { pdfExtractFileToText } from "@/lib/langchain";
import connectToDatabase from "@/lib/mongodb";
import { generateSummaryFromAI } from "@/lib/openai";
import { summaryModel } from "@/model/summaryModel";
import { connect } from "http2";
import { NextResponse } from "next/server";

export async function generatePdfSummary(
  uploadResponse: {
    serverData: {
      uploadedby: string;
      file: {
        url: string;
        name: string;
      };
    };
  }[]
) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "file upload fail",
      data: null,
    };
  }

  const {
    serverData: { uploadedby, file: { url, name } },
  } = uploadResponse[0];

  if (!url) {
    return {
      success: false,
      message: "file upload fail",
      data: null,
    };
  }


  // Assuming success, return appropriate data

  try {
    const pdfText= await pdfExtractFileToText(url)
    console.log({pdfText});
    console.log("idhr aya hai text")

    let summary;
    try {
      summary = await generateSummaryFromAI(pdfText)
      // console.log({summary})
      return summary

      
    } catch (error) {
      console.log(error)
    }
    
  } catch (error) {
    console.log(error)
  }

}

export async function savedSummary({userid,fileName,fileUrl,summaryText,title}:{
  userid:string,
  fileName:string,
  fileUrl:string,
  summaryText:any,
  title:string


}){
  await connectToDatabase()
  try {
    console.log(userid, fileUrl)
    const createSummary= new summaryModel({
      userid,fileName,fileUrl,summaryText,title })

      await createSummary.save()

      return{
        
      success: true,
      message: "save to database",
      data: null,
    
      }

  } catch (error) {
    console.log(error)
  }
    
  }