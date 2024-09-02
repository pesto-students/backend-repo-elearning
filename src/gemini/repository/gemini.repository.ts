import { GenerateContentResult } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {geminiHandle, handleChatReq, handleFileUpload} from "src/core/providers/geminiProvider/gemini.provider";
import { Organization } from "src/core/schemas/organization.schema";


@Injectable()
export class GeminiRepository{
    constructor() {}
    
    async search(prompt: string): Promise<string> {
        // const createdOrganization = new this.organizationModel(createOrganizationDto);
        // return createdOrganization.save();
        const res = await geminiHandle(prompt);
        console.log(res);
         return res.response.text();
      }

     async uploadFile(filepath: string,displayName: string){
        const res = await handleFileUpload(filepath, displayName);
        return res;
     }

     async handleChat(prompt: string, history: any): Promise<GenerateContentResult>{
        const res = await handleChatReq(prompt, history);
        return res;
     }
    
      // async findAll(): Promise<Organization[]> {
      //   return this.organizationModel.find().exec();
      // }
    
      // async findOne(id: string): Promise<Organization> {
      //   return this.organizationModel.findById(id).exec();
      // }
    
      // async update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
      //   return this.organizationModel.findByIdAndUpdate(id, updateOrganizationDto, { new: true }).exec();
      // }
    
      // async remove(id: string): Promise<Organization> {
      //   return this.organizationModel.findByIdAndDelete(id).exec();
      // }
}