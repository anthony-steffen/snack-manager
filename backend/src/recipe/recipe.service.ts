import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRecipeDto) {
    const existing = await this.prisma.recipe.findUnique({
      where: { productId: dto.productId },
    });

    if (existing) {
      throw new ConflictException('This product already has a recipe.');
    }

    return this.prisma.recipe.create({
      data: {
        productId: dto.productId,
        items: {
          create: dto.items.map((item) => ({
            ingredientId: item.ingredientId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.recipe.findMany({
      include: {
        product: true,
        items: {
          include: { ingredient: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        product: true,
        items: {
          include: { ingredient: true },
        },
      },
    });

    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async update(id: number, dto: UpdateRecipeDto) {
    // Exclui todos os items antigos e recria
    await this.prisma.recipeItem.deleteMany({ where: { recipeId: id } });

    return this.prisma.recipe.update({
      where: { id },
      data: {
        items: {
          create: (dto.items ?? []).map((item) => ({
            ingredientId: item.ingredientId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: { ingredient: true },
        },
      },
    });
  }

  async remove(id: number) {
    await this.prisma.recipeItem.deleteMany({ where: { recipeId: id } });
    return this.prisma.recipe.delete({ where: { id } });
  }
}
