import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(4, 4, { message: 'Code must be exactly 4 digits' })
  code: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  description: string;

  @IsString()
  imgUrl: string;

  @IsNumber()
  @IsPositive()
  stock: number;
}
