import { Injectable, NotFoundException, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SizeRepository } from './size.repository';
import { Size } from './size.entity';
import { CreateSizeDto } from './dto/create-size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeRepository)
    private sizeRepository: SizeRepository,
  ) {}

  async createSize(createSizeDto: CreateSizeDto): Promise<Size> {
    return this.sizeRepository.createSize(createSizeDto);
  }

  async SizeFindById(id: number): Promise<Size> {
    const size = await this.sizeRepository.findOne(id);
    return size;
  }

  async deleteSize(id: number): Promise<Size> {
    const size = await this.sizeRepository.findOne(id);
    //const result = await this.sizeRepository.delete(id);
    // if (result.affected === 0) {
    //   throw new NotFoundException(`Product with ID ${id} not found`);
    // }
    if (size.stock > 0) {
      size.stock = size.stock - 1;
      await size.save();
    }
    return size;
  }

  async updateSize(id: number, createSizeDto: CreateSizeDto) {
    const size = await this.SizeFindById(id);
    const { name, stock } = createSizeDto;

    if (name) {
      size.name = name;
    }
    if (stock) {
      size.stock = stock;
    }

    await size.save();
    return size;
  }

  async suppressionSize(id: number) {
    const result = await this.sizeRepository.delete(id);
  }
}
