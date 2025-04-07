import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: any }): any {
    return req.user; // Retorna os dados do usuário autenticado
  }

  @Post('refresh')
  async refresh(@Body() body: { userId: number; refreshToken: string }) {
    return this.authService.refreshToken(body.userId, body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: { user: { id: number } }) {
    const userId = req.user.id;
    return this.authService.logout(userId);
  }
}
