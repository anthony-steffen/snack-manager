// tools/compress-logs.ts
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

const logsDir = path.join(__dirname, '../logs');
const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

console.log('🔍 Procurando logs antigos em', logsDir);

fs.readdir(logsDir, (err, files) => {
  if (err) {
    console.error('❌ Erro ao ler diretório de logs:', err);
    return;
  }

  const logsToCompress = files.filter(
    (file) =>
      file.startsWith('audit-') &&
      file.endsWith('.log') &&
      !file.includes(today),
  );

  if (logsToCompress.length === 0) {
    console.log('ℹ️ Nenhum log antigo para compactar.');
    return;
  }

  logsToCompress.forEach((file) => {
    const filePath = path.join(logsDir, file);
    const compressedPath = `${filePath}.gz`;

    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(compressedPath);
    const gzip = zlib.createGzip();

    input
      .pipe(gzip)
      .pipe(output)
      .on('finish', () => {
        console.log(`📦 Arquivo ${file} compactado.`);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr)
            console.error(`❌ Falha ao remover ${file}:`, unlinkErr);
          else console.log(`🧹 Arquivo original ${file} removido.`);
        });
      });
  });
});
