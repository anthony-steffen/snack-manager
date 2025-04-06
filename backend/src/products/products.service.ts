import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: dto,
    });
  }
  async findAll() {
    return this.prisma.product.findMany();
  }
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
  async update(id: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: dto,
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
}
