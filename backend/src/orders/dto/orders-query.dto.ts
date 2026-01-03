import { PaginationQueryDto } from './pagination-query.dto';
import { IsIn, IsOptional } from 'class-validator';

export class OrdersQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn([
    'id',
    'name',
    'surname',
    'email',
    'phone',
    'age',
    'course',
    'course_format',
    'course_type',
    'status',
    'sum',
    'alreadyPaid',
    'created_at',
  ])
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDir?: 'asc' | 'desc';
}
