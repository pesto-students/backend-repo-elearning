import { IsNotEmpty, IsString } from 'class-validator';

export class CountryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  constructor(partial: Partial<CountryDto>){
    Object.assign(this, partial);
  }
}