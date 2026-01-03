import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
