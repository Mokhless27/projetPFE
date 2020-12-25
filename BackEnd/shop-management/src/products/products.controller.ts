import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductsFilterDto,
  ): Promise<Product[]> {
    return this.productsService.getProducts(filterDto);
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.deleteProduct(id);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, createProductDto);
  }
}
