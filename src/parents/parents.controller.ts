import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Added import
import { DbQueryConditionDto, ParentDto } from './dto/parents.dto'; // Updated import
import { ParentsService } from './parents.service';

@ApiTags('Parent') // Added Swagger tag
@Controller('parent')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new parent' })
  @ApiResponse({ status: 201, description: 'The parent has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() parentDto: ParentDto, @Request() request) {
    return this.parentsService.createParent(parentDto, request);
  }

  @Post('fetch')
  @ApiOperation({ summary: 'Find parents based on condition' })
  @ApiResponse({ status: 200, description: 'Return parents based on condition.' })
  @ApiResponse({ status: 404, description: 'Parent not found.' })
  find(@Body() condition: DbQueryConditionDto) {
    return this.parentsService.fetchParent(condition);
  }

  @Post('update')
  @ApiOperation({ summary: 'Update a parent by ID' })
  @ApiResponse({ status: 200, description: 'The parent has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Parent not found.' })
  update(@Body() updateData: { _id: string, parentDto: ParentDto }) {
    return this.parentsService.updateParent(updateData._id, updateData.parentDto);
  }

  // @Post('delete')
  // @ApiOperation({ summary: 'Delete a parent by ID' })
  // @ApiResponse({ status: 200, description: 'The parent has been successfully deleted.' })
  // @ApiResponse({ status: 404, description: 'Parent not found.' })
  // remove(@Body() deleteData: { id: string }) {
  //   return this.parentsService.removeParent(deleteData.id);
  // }
}