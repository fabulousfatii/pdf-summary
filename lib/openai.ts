import OpenAI from "openai";
import { SUMMARY_PROMT } from "./promts";
const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

export async function generateSummaryFromAI(pdfText:string) {
try {
        const response = await client.responses.create({
        model: "gpt-4.1-mini	",
        input: [
            {
                role: "system",
                content: SUMMARY_PROMT
            },
            {
                  role: "user",
                content: `Transform this document into an engaging, easy-to-read summary with contexually relevant emojis and proper markdown formatting:\n\n${pdfText}`
            }
        ],
    });
    
    // console.log(response.output_text);
    return response.output_text
} catch (error) {
    console.log(error)
}

    
}