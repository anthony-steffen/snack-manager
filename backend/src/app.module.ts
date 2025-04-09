import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuditMiddleware } from './middleware/audit.middleware';
import { LogCompressionService } from '../logs/log-compression.service'; // Importa o serviço de compressão de logs

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carrega .env globalmente
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LogCompressionService], // Adiciona o serviço de compressão de logs
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditMiddleware)
      .forRoutes(
        { path: 'users/:id/role', method: RequestMethod.PATCH },
        { path: 'users/:id/remove', method: RequestMethod.DELETE },
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PATCH },
        { path: 'products/:id', method: RequestMethod.DELETE },
      ); // Aplica o middleware a todas as rotas
  }
}
