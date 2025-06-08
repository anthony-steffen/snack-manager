/* eslint-disable @typescript-eslint/unbound-method */
import * as main from '../main';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

describe('main.ts', () => {
  const enableCors = jest.fn();
  const listen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.PORT;
  });

  it('should bootstrap with provided PORT', async () => {
    process.env.PORT = '4001';

    (NestFactory.create as jest.Mock).mockResolvedValueOnce({
      enableCors,
      listen,
    });

    await main.bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(enableCors).toHaveBeenCalledWith({
      origin: 'http://localhost:5173',
      credentials: true,
    });
    expect(listen).toHaveBeenCalledWith('4001');
  });

  it('should fallback to default port 4000 if PORT is not set', async () => {
    (NestFactory.create as jest.Mock).mockResolvedValueOnce({
      enableCors,
      listen,
    });

    await main.bootstrap();

    expect(listen).toHaveBeenCalledWith(4000);
  });

  it('should return true if is main module', () => {
    const fakeModule = {};
    expect(main.isMainModule(fakeModule as any, fakeModule as any)).toBe(true);
  });

  it('should return false if not main module', () => {
    expect(main.isMainModule({} as any, {} as any)).toBe(false);
  });
});
