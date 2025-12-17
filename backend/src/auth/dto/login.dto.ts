import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
