import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@UseGuards(JwtAuthGuard) // Aplica autenticação JWT a todas as rotas do controlador
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(RolesGuard) // Aqui basta aplicar apenas o RolesGuard
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/role')
  update(@Param('id') id: number, @Param() dto: UpdateUserRoleDto) {
    return this.usersService.update(id, dto);
  }
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Delete(':id/remove')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
