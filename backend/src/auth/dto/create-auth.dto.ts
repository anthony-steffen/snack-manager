import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(4, { message: 'Nome deve ter pelo menos 4 caracteres' })
  name: string;

  @IsEmail({}, { message: 'Formato de email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsEnum(Role, { message: 'Função deve ser USER ou ADMIN' })
  role: Role;
}
