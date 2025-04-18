import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class RecipeItemDto {
  @IsNumber()
  @IsPositive()
  ingredientId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateRecipeDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeItemDto)
  items: RecipeItemDto[];
}
