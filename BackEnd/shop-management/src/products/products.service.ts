import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getProducts(filterDto: GetProductsFilterDto): Promise<Product[]> {
    return this.productRepository.getProducts(filterDto);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return found;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async updateProduct(
    id: number,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const {
      color,
      gender,
      description,
      img,
      price,
      rating,
      size,
      tags,
    } = createProductDto;

    const product = await this.getProductById(id);

    if (color) {
      product.color = color.split(',').map(color => color.trim());
    }
    if (rating) {
      product.rating = rating;
    }
    if (size) {
      product.size = size.split(',').map(size => size.trim());
    }
    if (img) {
      product.img = img.split(',').map(img => img.trim());
    }
    if (gender) {
      product.gender = gender;
    }

    if (price) {
      product.price = price;
    }

    if (description) {
      product.description = description;
    }

    if (tags) {
      product.tags = tags.split(',').map(tags => tags.trim());
    }

    await product.save();
    return product;
  }
}
