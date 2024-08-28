import { config } from 'dotenv';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from "@google/generative-ai/server";
config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const chat = model.startChat({
  history: [],
  generationConfig: {
    maxOutputTokens: 500
  }
})
// Upload the file and specify a display name.


const geminiHandle = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result
};


const handleFileUpload =  async (filePath: string, displayName: string) => {
 console.log(filePath)
 const res = await fileManager.uploadFile(filePath, {
  mimeType: "application/pdf",
  displayName: displayName,
})
console.log(res);
return res;
}

const handleChatReq = async (text: string) => {
  return await chat.sendMessage(text);
}

export  {geminiHandle, handleFileUpload, handleChatReq};
