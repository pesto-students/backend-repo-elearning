import { Body, Controller, HttpStatus, Post, Res, Get, Param, Query, UseInterceptors, UploadedFile } from "@nestjs/common";
import { GeminiService } from "./gemini.service";
import { FileInterceptor } from "@nestjs/platform-express";
import {writeFileSync, openSync, unlinkSync} from "fs";
import { File } from "buffer";
import {join} from "path";

const defaultMsgBody = {
    text: '',
    userType: 'chatbot'
}


@Controller('gemini')
export class GeminiController {
    constructor(private readonly geminiService: GeminiService){}

    @Get('search')
    async search(@Query('prompts') prompt, @Res() res){
        try {
           console.log(prompt, 'hereeee')
            const newOrganization = await this.geminiService.search(prompt);
            // console.log('newOrganization: ', newOrganization);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: '',
                data: newOrganization

            });
        } catch (error) {
            // return res.status(HttpStatus.BAD_REQUEST).json({
            //     statusCode: HttpStatus.BAD_REQUEST,
            //     message: 'Error creating organization',
            //     error: error.message,
            //   });
        }
    };
    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile( @UploadedFile() file , @Res() res){
        try {
            console.log(file);
            const filepath = join(__dirname, file.originalname );
            const fd = openSync(filepath , 'w');
            writeFileSync(fd, file.buffer)
            const uploadData = await this.geminiService.uploadFile(filepath, file.originalname);
            // const uploadData = {
            //         "file": {
            //             "name": "files/ho7wcsymyerh",
            //             "displayName": "Vinayak-PK-Resume.pdf",
            //             "mimeType": "application/pdf",
            //             "sizeBytes": "103878",
            //             "createTime": "2024-08-26T12:34:33.925964Z",
            //             "updateTime": "2024-08-26T12:34:33.925964Z",
            //             "expirationTime": "2024-08-28T12:34:33.851431182Z",
            //             "sha256Hash": "NzBkMWRjZGRiMTZlZjc2N2Q2YzNmYjBkZmQyYzg4NmQ3Y2NiNGVkOTdlYzZhZWU2MjRmOTM2NzZjMDgwMDkyYQ==",
            //             "uri": "https://generativelanguage.googleapis.com/v1beta/files/ho7wcsymyerh",
            //             "state": "ACTIVE"
            //     }
            // }
            unlinkSync(filepath)
            res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: '',
                data: uploadData
            });
        } catch (error) {
            console.log(error)
            // return res.status(HttpStatus.BAD_REQUEST).json({
            //     statusCode: HttpStatus.BAD_REQUEST,
            //     message: 'Error creating organization',
            //     error: error.message,
            //   });
        }
    };
    @Post('create-questions')
    async createQuests(@Body() body, @Res() res){
        try {
           console.log(body.prompts, 'hereeeeBody')
            const response = await this.geminiService.search(body.prompts);
            res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: '',
                data: response
                // data: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Vinayak's Story</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            padding: 20px;\n            background-color: #f4f4f4;\n        }\n        h1 {\n            color: #333;\n        }\n        h2 {\n            color: #555;\n        }\n        .question {\n            margin: 20px 0;\n        }\n        .answer-key {\n            background-color: #eaeaea;\n            padding: 10px;\n            border-left: 4px solid #333;\n        }\n    </style>\n</head>\n<body>\n\n    <h1>Vinayak's Story</h1>\n\n    <h2>Instructions:</h2>\n    <p>Read the information about Vinayak and choose the best answer for each question.</p>\n\n    <div class=\"question\">\n        <h2>1. What is Vinayak's job?</h2>\n        <ul>\n            <li>a) Teacher</li>\n            <li>b) Web Developer</li>\n            <li>c) Doctor</li>\n            <li>d) Musician</li>\n        </ul>\n    </div>\n\n    <div class=\"question\">\n        <h2>2. Where did Vinayak study Web Development?</h2>\n        <ul>\n            <li>a) Kendriya Vidyalaya</li>\n            <li>b) Visvesvaraya Technological University</li>\n            <li>c) Masai School</li>\n            <li>d) Paytm</li>\n        </ul>\n    </div>\n\n    <div class=\"question\">\n        <h2>3. What is the name of the website Vinayak built?</h2>\n        <ul>\n            <li>a) Whatsapp Clone</li>\n            <li>b) Transcend Hub</li>\n            <li>c) Soundbox</li>\n            <li>d) Orchestrator</li>\n        </ul>\n    </div>\n\n    <div class=\"question\">\n        <h2>4. What did Vinayak learn at Harvard CS50?</h2>\n        <ul>\n            <li>a) How to play music</li>\n            <li>b) How to build websites</li>\n            <li>c) How to fly a plane</li>\n            <li>d) How to become a doctor</li>\n        </ul>\n    </div>\n\n    <div class=\"question\">\n        <h2>5. What is Vinayak's favorite hobby?</h2>\n        <ul>\n            <li>a) Playing video games</li>\n            <li>b) Playing music</li>\n            <li>c) Traveling</li>\n            <li>d) We don't know from this information</li>\n        </ul>\n    </div>\n\n    <div class=\"answer-key\">\n        <h2>Answer Key:</h2>\n        <p>1. b</p>\n        <p>2. c</p>\n        <p>3. b</p>\n        <p>4. b</p>\n        <p>5. d</p>\n    </div>\n\n</body>\n</html>"

                // data: "Sure, here are some multiple-choice questions for a fourth-grade class, based on the provided notes, with a medium difficulty level:\n\n**Question 1:**\n\nWhat is a web developer's main job?\n\na) To create websites\nb) To write music\nc) To fix computers\nd) To design buildings\n\n**Answer:** a) To create websites\n\n**Question 2:**\n\nWhat programming language is NOT mentioned in the notes as being used by Vinayak?\n\na) JavaScript\nb) Python\nc) Java\nd) C++\n\n**Answer:** c) Java\n\n**Question 3:**\n\nWhat is the name of the company where Vinayak works as a Software Engineer?\n\na) Google\nb) Microsoft\nc) Amazon\nd) Paytm\n\n**Answer:** d) Paytm\n\n**Question 4:**\n\nWhat is a \"Knowledge Transfer Platform\"?\n\na) A place to learn new things\nb) A type of computer game\nc) A way to travel around the world\nd) A special kind of food\n\n**Answer:** a) A place to learn new things\n\n**Question 5:**\n\nWhat is one thing that Vinayak learned to do in his \"The Machine Learning Pipeline on AWS\" course?\n\na) How to build robots\nb) How to make a website\nc) How to use a machine learning pipeline\nd) How to fix a broken computer\n\n**Answer:** c) How to use a machine learning pipeline\n\n**Question 6:**\n\nWhat is one thing that Vinayak learned to do in his \"Harvard CS50's Web Programming with Python and JavaScript\" course?\n\na) How to build a robot\nb) How to fix a computer\nc) How to build a website\nd) How to learn a new language\n\n**Answer:** c) How to build a website \n\n**Question 7:**\n\nWhat is the name of the app that Vinayak built using Socket.IO?\n\na) Transcend Hub\nb) Whatsapp-Clone\nc) Soundbox\nd) Orchestrator\n\n**Answer:** b) Whatsapp-Clone \n\n**Question 8:**\n\nWhat is the name of the software that Vinayak uses to automate tasks using robots?\n\na) Socket.IO\nb) Django\nc) Uipath\nd) React\n\n**Answer:** c) Uipath\n\nThese questions are designed to test a fourth-grader's understanding of basic computer science concepts and the information provided in the notes. They are not overly difficult, but they require some critical thinking and reading comprehension.\n"

            });
        } catch (error) {
            // return res.status(HttpStatus.BAD_REQUEST).json({
            //     statusCode: HttpStatus.BAD_REQUEST,
            //     message: 'Error creating organization',
            //     error: error.message,
            //   });
        }
    }

    @Get('chat-assistance')
    async handleChat(@Query('prompt') prompt, @Res() res){
        try {
             // const response = await this.geminiService.search(body.prompts);
             const resp = await this.geminiService.handleChat(prompt);
             const response = resp.response;
             const msgBody = {...defaultMsgBody, text: response.text()} 
             res.status(HttpStatus.OK).json({
                 statusCode: HttpStatus.OK,
                 message: 'SUCCESS',
                 data: msgBody
             });
         } catch (error) {
             return res.status(HttpStatus.BAD_REQUEST).json({
                 statusCode: HttpStatus.BAD_REQUEST,
                 message: 'Error occured',
                 error,
               });
         }
      
    }

}