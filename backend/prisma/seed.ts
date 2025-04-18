import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'ADMIN',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  const categories = [
    { name: 'Bebidas', type: 'Refrigerantes, Sucos, Água' },
    { name: 'Salgados', type: 'Coxinha, Torta, Pão de Queijo, Pastel' },
    { name: 'Bolos', type: 'Leite, Fofo, Milho, Chocolate, Mesclado' },
    { name: 'Doces', type: 'Leite, Alfajor, Cocada, Côco' },
  ];

  const ingredients = [
    { name: 'Pão de hambúrguer', unitPrice: 1.0 },
    { name: 'Queijo mussarela', unitPrice: 2.0 },
    { name: 'Presunto', unitPrice: 1.5 },
    { name: 'Molho de tomate', unitPrice: 0.5 },
    { name: 'Carne moída', unitPrice: 3.5 },
    { name: 'Frango desfiado', unitPrice: 2.8 },
    { name: 'Massa de pastel', unitPrice: 1.2 },
    { name: 'Chocolate granulado', unitPrice: 0.8 },
    { name: 'Leite condensado', unitPrice: 3.2 },
    { name: 'Coco ralado', unitPrice: 1.4 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ingredient.name },
      update: {},
      create: ingredient,
    });
  }

  console.log('✅ Seed finalizado com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
