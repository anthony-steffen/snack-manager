/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role } from './dto/create-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn().mockResolvedValue('mockedRegisterResponse'),
    login: jest.fn().mockResolvedValue('mockedLoginResponse'),
    refreshToken: jest.fn().mockResolvedValue('mockedRefreshToken'),
    logout: jest.fn().mockResolvedValue('mockedLogout'),
  };

  interface authDto {
    email: string;
    password: string;
    role: Role;
    name: string;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const dto = {
      email: 'test@example.com',
      password: '123456',
      role: Role.USER,
      name: 'Test User',
    };
    const result = (await controller.register(dto)) as authDto;
    expect(authService.register).toHaveBeenCalledWith(dto);
    expect(result).toBe('mockedRegisterResponse');
  });

  it('should login a user', async () => {
    const dto = {
      email: 'test@example.com',
      password: '123456',
      role: 'USER',
      name: 'Test User',
    };
    const result = await controller.login(dto);
    expect(authService.login).toHaveBeenCalledWith(dto);
    expect(result).toBe('mockedLoginResponse');
  });

  it('should return profile from request', () => {
    const mockReq = { user: { id: 1, email: 'test@example.com' } };
    const result = controller.getProfile(mockReq) as authDto;
    expect(result).toEqual(mockReq.user);
  });

  it('should refresh token', async () => {
    const body = { userId: 1, refreshToken: 'abc123' };
    const result = await controller.refresh(body);
    expect(authService.refreshToken).toHaveBeenCalledWith(1, 'abc123');
    expect(result).toBe('mockedRefreshToken');
  });

  it('should logout user', async () => {
    const mockReq = { user: { id: 1 } };
    const result = await controller.logout(mockReq);
    expect(authService.logout).toHaveBeenCalledWith(1);
    expect(result).toBe('mockedLogout');
  });
});
