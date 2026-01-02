import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  @MaxLength(25)
  name?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  surname?: string | null;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(12)
  phone?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(150)
  age?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  course?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  course_format?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  course_type?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  sum?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  alreadyPaid?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  utm?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  msg?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  status?: string | null;
}
