"use client"

import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useUploadThing } from '@/lib/uploadthing';
import { generatePdfSummary, savedSummary } from '@/actions/upload-actions';
import { useSession } from "next-auth/react";
import { User } from "next-auth";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  file: File;
  status: 'ready' | 'uploading' | 'completed' | 'error';
}

export default function PDFUploadPage() {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //defining schema
  const schema = z.object({
    file: z
      .instanceof(File, { message: "Invalid file" })
      .refine((file) => file.size <= 50 * 1024 * 1024, {
        message: "File size must be less than 50MB"
      })
      .refine((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf'), {
        message: "File must be a PDF"
      })
  });

  //uploadting library config ----> code available in its documentation
  const { startUpload } = useUploadThing("PDFUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });
   
  //finding user
   const { data: session } = useSession()
  const user: User = session?.user



  // function to select file
const handleFileSelect=async(e:React.ChangeEvent<HTMLInputElement>)=>{
   e.preventDefault()
 
   
  
if (e.target.files && e.target.files[0]) {  
     const file = e.target.files[0]
    
     if (!file || file.name === '') {
      console.log("No file selected");
      alert("Please select a file first");
      return;
    }
    console.log(file);

    const uploadedFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      file: file,
      status: 'ready'
    };

    setSelectedFile(uploadedFile)

    // Validate schema file
  
  }

  

  }

  const handleUpload= async()=>{
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    setIsUploading(true)


         try {
      const validatedFile = schema.parse({ file: selectedFile.file });
      console.log("File validated successfully", validatedFile);

      // Proceed to upload
      try {
        const filedata = await startUpload([selectedFile.file]);
        console.log("Upload response:", filedata);



        //genarate summary and saving it 
        if (filedata && filedata.length > 0) {
          const summary = await generatePdfSummary(filedata);
          console.log({ summary });
          
          await savedSummary({
            userid:user?.id,
            fileName:filedata[0]?.name,
            fileUrl:filedata[0]?.url,
            summaryText:summary,
            title:"title"

          })



        } else {
          console.log("Upload failed");
          alert("Upload failed");
        }
      } catch (uploadError) {
        console.log("Upload error:", uploadError);
        alert("An error occurred during upload");
      }

      //
            setIsUploading(false)
            setSelectedFile(null)

    } catch (error) {
      console.log("Validation error:", error);
      // alert("File validation failed: " + (error));
      return;
    }
  }
  

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
            Upload Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              PDF Documents
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Drop your PDF files here or click to browse. We will transform them into beautiful, concise summaries in seconds.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Area */}
          <div
            // onSubmit={handleSubmit}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
             isUploading
                ? 'border-pink-400 bg-pink-50 scale-105' 
                : 'border-gray-300 bg-white hover:border-pink-300 hover:bg-pink-25'
            }`}
            // onDragOver={handleDragOver}
            // onDragLeave={handleDragLeave}
            // onDrop={handleDrop}
          >
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Drag and drop your PDF files here
            </h3>
            <p className="text-gray-600 mb-6">
              or click to browse from your computer
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Choose Files
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
            onChange={handleFileSelect}
              className="hidden"
            />
            
            <p className="text-sm text-gray-500 mt-4">
              Support: PDF files up to 50MB each
            </p>
          </div>

          {/* Uploaded Files List */}
          {selectedFile && (
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Uploaded File
                </h3>
                {selectedFile.status === 'ready' && (
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? 'Processing...' : 'Start Summarization'}
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">{selectedFile.name}</p>
                      <p className="text-sm text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedFile.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {selectedFile.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          
        </div>
      </div>
    </div>
  );
}