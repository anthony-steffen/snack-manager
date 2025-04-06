import { IsEnum } from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class UpdateUserRoleDto {
  @IsEnum(UserRole, { message: 'Role must be USER or ADMIN' })
  role: UserRole;
}
