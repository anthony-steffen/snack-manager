import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const user = req.user as { email?: string }; // pode vir do JWT
    const timestamp = new Date().toISOString();

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const log = `[${timestamp}] ${method} ${originalUrl} - ${statusCode} - User: ${user?.email || 'Guest'}\n`;

      console.log('[AUDIT] Log gerado:', log); // 👈 ajuda no debug

      const logDir = path.resolve(process.cwd(), 'logs');
      const logPath = path.join(logDir, 'audit.log');

      try {
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
          console.log('[AUDIT] Pasta de logs criada:', logDir);
        }

        fs.appendFileSync(logPath, log);
        console.log('[AUDIT] Log gravado com sucesso.');
      } catch (error) {
        console.error('[AUDIT] Erro ao salvar log:', error);
      }
    });

    next();
  }
}
