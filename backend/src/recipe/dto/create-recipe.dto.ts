import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RecipeItemDto {
  @IsNumber()
  @IsPositive()
  ingredientId: number;

  @IsNumber()
  @Min(0.01)
  quantity: number;
}

export class CreateRecipeDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  validity: string;

  @IsNumber()
  @IsPositive()
  yield: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeItemDto)
  items: RecipeItemDto[];
}
