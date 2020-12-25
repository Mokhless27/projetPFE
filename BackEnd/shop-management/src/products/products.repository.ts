import { Repository, EntityRepository } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
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
    const product = new Product();

    product.description = description;
    product.gender = gender;
    product.price = price;
    product.rating = rating;

    product.color = color.split(',').map(color => color.trim());
    product.img = img.split(',').map(img => img.trim());
    product.size = size.split(',').map(size => size.trim());
    product.tags = tags.split(',').map(tags => tags.trim());

    await product.save();
    return product;
  }

  async getProducts(filterDto: GetProductsFilterDto): Promise<Product[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('product');
    if (search) {
      query.andWhere(
        '(product.gender LIKE :search OR product.tags LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const products = await query.getMany();
    return products;
  }
}
