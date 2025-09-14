import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function pdfExtractFileToText(fileUrl:string){

    const response= await fetch(fileUrl)
    const blob = response.blob()

    const arrayBuffer = await (await blob).arrayBuffer();

    const loader = new PDFLoader(new Blob([arrayBuffer]));

    const docs = await loader.load();

    return docs.map((doc)=>doc.pageContent).join("/n")


   

}