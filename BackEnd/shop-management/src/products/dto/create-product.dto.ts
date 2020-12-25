import { IsString } from 'class-validator';
import { ProductSize, ProductGender } from '../products.enum';
import { Double } from 'typeorm';

export class CreateProductDto {
  description: string;
  size: string;
  color: string;
  gender: ProductGender;
  price: number;
  img: string;
  rating: number;
  tags: string;
}
