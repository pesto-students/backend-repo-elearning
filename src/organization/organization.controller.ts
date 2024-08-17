import { Body, Controller, HttpStatus, Post, Res, Get, Param } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService){}

    @Post('create')
    async create(@Body() createOrganizationDto: CreateOrganizationDto, @Res() res: Response){
        try {
          console.log('createOrganizationDto',createOrganizationDto);
            const newOrganization = await this.organizationService.create(createOrganizationDto);
            console.log('newOrganization: ', newOrganization);
            return newOrganization;
            // return res.status(HttpStatus.OK).json({
            //     statusCode: HttpStatus.BAD_REQUEST,
            //     message: '',
            //     data: newOrganization
            // });
        } catch (error) {
            // return res.status(HttpStatus.BAD_REQUEST).json({
            //     statusCode: HttpStatus.BAD_REQUEST,
            //     message: 'Error creating organization',
            //     error: error.message,
            //   });
        }
    }


  // @Get()
  // async findAll(@Res() res: Response) {
  //   try {
  //     const organizations = await this.organizationService.findAll();
  //     return res.status(HttpStatus.OK).json({
  //       message: 'Organizations retrieved successfully',
  //       data: organizations,
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error retrieving organizations',
  //       error: error.message,
  //     });
  //   }
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string, @Res() res: Response) {
  //   try {
  //     const organization = await this.organizationService.findOne(id);
  //     if (!organization) {
  //       return res.status(HttpStatus.NOT_FOUND).json({
  //         message: 'Organization not found',
  //       });
  //     }
  //     return res.status(HttpStatus.OK).json({
  //       message: 'Organization retrieved successfully',
  //       data: organization,
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error retrieving organization',
  //       error: error.message,
  //     });
  //   }
  // }

  // @Post(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateOrganizationDto: UpdateOrganizationDto,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const updatedOrganization = await this.organizationService.update(id, updateOrganizationDto);
  //     if (!updatedOrganization) {
  //       return res.status(HttpStatus.NOT_FOUND).json({
  //         message: 'Organization not found',
  //       });
  //     }
  //     return res.status(HttpStatus.OK).json({
  //       message: 'Organization updated successfully',
  //       data: updatedOrganization,
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error updating organization',
  //       error: error.message,
  //     });
  //   }
  // }

  // @Post(':id')
  // async remove(@Param('id') id: string, @Res() res: Response) {
  //   try {
  //     const deletedOrganization = await this.organizationService.remove(id);
  //     if (!deletedOrganization) {
  //       return res.status(HttpStatus.NOT_FOUND).json({
  //         message: 'Organization not found',
  //       });
  //     }
  //     return res.status(HttpStatus.OK).json({
  //       message: 'Organization deleted successfully',
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error deleting organization',
  //       error: error.message,
  //     });
  //   }
  // }
}