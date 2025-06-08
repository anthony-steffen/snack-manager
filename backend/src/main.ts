import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Função isolada para verificar se o módulo atual é o principal.
 * Permite teste unitário da condição: `if (require.main === module)`
 */
export function isMainModule(
  main: NodeModule | undefined,
  current: NodeModule,
): boolean {
  return main === current;
}

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
}

/* istanbul ignore next */
if (isMainModule(require.main, module)) {
  bootstrap();
}
