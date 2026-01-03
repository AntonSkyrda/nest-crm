import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  name: string;
}
