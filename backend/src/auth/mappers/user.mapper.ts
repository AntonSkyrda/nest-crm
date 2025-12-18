import { User } from '../enteties/user.entity';
import { UserMeDto } from '../dto/user-me.dto';

export function toUserMeDto(user: User): UserMeDto {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
