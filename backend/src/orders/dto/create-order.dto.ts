import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { OrderCoursesEnum } from '../../enums/order-courses.enum';
import { OrderStatusEnum } from '../../enums/order-status.enum';
import { OrderCoursesTypeEnum } from '../../enums/order-courses-type.enum';
import { OrderCoursesTypeFormatEnum } from '../../enums/order-courses-format.enum';

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
  @IsEnum(OrderCoursesEnum)
  course?: OrderCoursesEnum | null;

  @IsOptional()
  @IsEnum(OrderCoursesTypeFormatEnum)
  course_format?: OrderCoursesTypeFormatEnum | null;

  @IsOptional()
  @IsEnum(OrderCoursesTypeEnum)
  course_type?: OrderCoursesTypeEnum | null;

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
  @IsEnum(OrderStatusEnum)
  status?: OrderStatusEnum | null;
}
