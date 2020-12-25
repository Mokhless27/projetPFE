import { Entity, EntityRepository, Repository } from 'typeorm';
import { Size } from './size.entity';
import { CreateSizeDto } from './dto/create-size.dto';

@EntityRepository(Size)
export class SizeRepository extends Repository<Size> {
  async createSize(createSizeDto: CreateSizeDto): Promise<Size> {
    const { name, stock } = createSizeDto;
    const size = new Size();
    size.name = name;
    size.stock = stock;
    await size.save();
    return size;
  }
}
