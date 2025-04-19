import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async create(createIngredientDto: CreateIngredientDto) {
    // Verifica duplicação por nome ou código
    const existing = await this.prisma.ingredient.findFirst({
      where: {
        OR: [{ name: createIngredientDto.name }],
      },
    });

    if (existing) {
      throw new ConflictException(
        'An ingredient with the same name already exists.',
      );
    }

    // Cria o ingrediente
    return this.prisma.ingredient.create({
      data: {
        name: createIngredientDto.name,
        unitPrice: createIngredientDto.unitPrice,
      },
    });
  }

  async findAll() {
    return await this.prisma.ingredient.findMany();
  }

  async findOne(id: number) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id: Number(id) },
    });
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return ingredient;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return await this.prisma.ingredient.update({
      where: { id: Number(id) },
      data: {
        name: updateIngredientDto.name,
        unitPrice: updateIngredientDto.unitPrice,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.ingredient.delete({
      where: { id: Number(id) },
    });
  }
}
