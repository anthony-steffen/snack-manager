import { Test, TestingModule } from '@nestjs/testing';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuditMiddleware } from './middleware/audit.middleware';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { RolesGuard } from './auth/guards/roles.guard';
import { UpdateUserRoleDto } from './users/dto/update-user-role.dto';
import { LogCompressionService } from '../logs/log-compression.service';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
  it('should have AppController defined', () => {
    const appController = module.get<AppController>(AppController);
    expect(appController).toBeDefined();
  });
  it('should have AppService defined', () => {
    const appService = module.get<AppService>(AppService);
    expect(appService).toBeDefined();
  });
  it('should have UsersService defined', () => {
    const usersService = module.get<UsersService>(UsersService);
    expect(usersService).toBeDefined();
  });
  it('should have JwtAuthGuard defined', () => {
    const jwtAuthGuard = module.get<JwtAuthGuard>(JwtAuthGuard);
    expect(jwtAuthGuard).toBeDefined();
  });
  it('should have RolesGuard defined', () => {
    const rolesGuard = module.get<RolesGuard>(RolesGuard);
    expect(rolesGuard).toBeDefined();
  });
  it('should have LogCompressionService defined', () => {
    const logCompressionService = module.get<LogCompressionService>(
      LogCompressionService,
    );
    expect(logCompressionService).toBeDefined();
  });
  it('should have Roles decorator defined', () => {
    const rolesDecorator = Roles;
    expect(rolesDecorator).toBeDefined();
  });
  it('should have UpdateUserRoleDto defined', () => {
    const updateUserRoleDto = UpdateUserRoleDto;
    expect(updateUserRoleDto).toBeDefined();
  });
  // it('should have AuditMiddleware defined', () => {
});

describe('AppModule Middleware Configuration', () => {
  it('should configure the AuditMiddleware correctly', () => {
    const appModule = new AppModule();

    const applyMock = jest.fn().mockReturnThis();
    const forRoutesMock = jest.fn();

    const consumerMock = {
      apply: applyMock,
      forRoutes: forRoutesMock,
    } as unknown as MiddlewareConsumer;

    appModule.configure(consumerMock);

    expect(appModule).toBeDefined();
    expect(consumerMock).toBeDefined();

    // Verifica se o middleware AuditMiddleware foi aplicado
    expect(applyMock).toHaveBeenCalledWith(AuditMiddleware);

    // Verifica se foi chamado com as rotas corretas
    expect(forRoutesMock).toHaveBeenCalledWith(
      { path: 'users/:id/role', method: RequestMethod.PATCH },
      { path: 'users/:id/remove', method: RequestMethod.DELETE },
      { path: 'products', method: RequestMethod.POST },
      { path: 'products/:id', method: RequestMethod.PATCH },
      { path: 'products/:id', method: RequestMethod.DELETE },
    );
  });
});
