import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  unitPrice: number;
}
