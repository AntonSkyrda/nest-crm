import { IsInt, Min } from 'class-validator';

export class SetOrderGroupDto {
  @IsInt()
  @Min(1)
  groupId: number;
}
