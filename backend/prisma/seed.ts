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

  const products = [
    {
      code: 'REF001',
      name: 'Refrigerante Lata',
      description: 'Refrigerante em lata de 350ml',
      price: 3.5,
      imgUrl: 'https://example.com/refrigerante-lata.jpg',
      stock: 100,
      category: { connect: { name: 'Bebidas' } },
    },
    {
      code: 'REF002',
      name: 'Suco Natural',
      description: 'Suco natural de laranja de 500ml',
      price: 4.0,
      imgUrl: 'https://example.com/suco-natural.jpg',
      stock: 50,
      category: { connect: { name: 'Bebidas' } },
    },
    {
      code: 'SAL001',
      name: 'Coxinha',
      description: 'Coxinha de frango com massa crocante',
      price: 5.0,
      imgUrl: 'https://example.com/coxinha.jpg',
      stock: 30,
      category: { connect: { name: 'Salgados' } },
    },
    {
      code: 'SAL002',
      name: 'Pão de Queijo',
      description: 'Pão de queijo quentinho e saboroso',
      price: 2.5,
      imgUrl: 'https://example.com/pao-de-queijo.jpg',
      stock: 20,
      category: { connect: { name: 'Salgados' } },
    },
    {
      code: 'BOL001',
      name: 'Bolo de Chocolate',
      description: 'Bolo de chocolate com cobertura cremosa',
      price: 15.0,
      imgUrl: 'https://example.com/bolo-chocolate.jpg',
      stock: 10,
      category: { connect: { name: 'Bolos' } },
    },
    {
      code: 'DOC001',
      name: 'Cocada',
      description: 'Cocada de côco fresco e doce',
      price: 3.0,
      imgUrl: 'https://example.com/cocada.jpg',
      stock: 25,
      category: { connect: { name: 'Doces' } },
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code },
      update: {},
      create: product,
    });
  }

  console.log('✅ Seed finalizado com sucesso.');
  console.log('✅ Produtos criados com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
