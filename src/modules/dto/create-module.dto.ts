import { IsString, IsOptional } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  moduleName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
