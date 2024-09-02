import { Module } from "@nestjs/common";
import { GeminiController } from "./gemini.controller";
import { GeminiService } from "./gemini.service";
import { GeminiRepository } from "./repository/gemini.repository";

@Module({

  controllers: [GeminiController],
  providers: [GeminiService, GeminiRepository]
})

export class GeminiModule {

}