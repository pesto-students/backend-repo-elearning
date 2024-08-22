import { Body, Controller, Post } from "@nestjs/common";

@Controller()
export class TeacherController{

    constructor(){}

    @Post('create')
    async AddTeacher(@Body() teacherDto){
        return;
    }

}