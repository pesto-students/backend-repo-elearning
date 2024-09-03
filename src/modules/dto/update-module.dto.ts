import { IsString, IsOptional } from 'class-validator';

export class UpdateModuleDto {
  @IsString()
  @IsOptional()
  moduleName?: string;

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
