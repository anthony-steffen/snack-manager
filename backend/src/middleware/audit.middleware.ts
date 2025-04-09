import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user as { email?: string };
    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();
    const statusCode = res.statusCode;

    // Subpasta com data atual
    const dateFolder = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const logsDir = path.resolve('logs', dateFolder);

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Logs diferentes conforme status
    const fileName = res.statusCode >= 400 ? 'errors.log' : 'access.log';

    // Monta log detalhado
    const log = `[${timestamp}] ${method} ${originalUrl} - ${statusCode} - User: ${
      user?.email ?? 'Guest'
    } - IP: ${req.ip} - UA: ${req.headers['user-agent']}\n`;

    res.on('finish', () => {
      const filePath = path.join(logsDir, fileName);
      fs.appendFile(filePath, log, (err) => {
        if (err) console.error('Erro ao escrever log de auditoria:', err);
      });
    });

    next();
  }
}
