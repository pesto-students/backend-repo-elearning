import { Injectable } from "@nestjs/common";
import { GeminiRepository } from "./repository/gemini.repository";

@Injectable()
export class GeminiService{

    constructor(private readonly geminiRepository: GeminiRepository){}

    async search(prompt: string){
        console.log(prompt)
        return this.geminiRepository.search(prompt);
    }

    async uploadFile(filePath: string, displayName){
        console.log(filePath,'filepath')
        return this.geminiRepository.uploadFile(filePath, displayName)
    }
    
    async handleChat(prompt: string, history: any){
        return this.geminiRepository.handleChat(prompt, history);
    }


}