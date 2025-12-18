import { RoleEnum } from '../../enums/role.enum';

export class UserMeDto {
  id: number;
  email: string;
  role: RoleEnum;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
