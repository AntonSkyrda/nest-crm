import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { RoleEnum } from '../../enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstName?: string;
  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName?: string;
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;
}
