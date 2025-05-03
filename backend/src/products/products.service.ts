import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    // Verifica duplicação por nome ou código
    const existing = await this.prisma.product.findFirst({
      where: {
        OR: [{ name: dto.name }, { code: dto.code }],
      },
    });

    if (existing) {
      throw new ConflictException(
        'A product with the same name or code already exists.',
      );
    }

    // Cria o produto
    return this.prisma.product.create({
      data: {
        code: dto.code,
        name: dto.name,
        category: {
          connect: { id: dto.categoryId },
        },
        description: dto.description,
        price: dto.price,
        imgUrl: dto.imgUrl,
        stock: dto.stock,
      },
      include: {
        category: true,
      },
    });
  }
  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: number) {
    // const parsedId = Number(id);
    console.log('ID:', id);

    if (isNaN(id) || id <= 0) {
      throw new NotFoundException(`Invalid product ID: ${id}`);
    }

    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        imgUrl: dto.imgUrl,
        stock: dto.stock,
        ...(dto.categoryId && {
          category: {
            connect: { id: dto.categoryId },
          },
        }),
      },
      include: {
        category: true,
      },
    });
  }
  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prisma.product.delete({
      where: { id },
    });
  }
  async findByName(name: string) {
    const product = await this.prisma.product.findFirst({
      where: { name },
    });
    if (!product) {
      throw new NotFoundException(`Product with name ${name} not found`);
    }
    return product;
  }

  async findByLowStock() {
    // Retorna produtos com estoque baixo (menor ou igual a 10)
    return this.prisma.product.findMany({
      where: {
        stock: {
          lte: 10,
        },
      },
      include: {
        category: true,
      },
    });
  }
}
