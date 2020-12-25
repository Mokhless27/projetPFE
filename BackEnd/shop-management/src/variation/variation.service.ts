import { Injectable } from '@nestjs/common';
import { VariationRepository } from './variation.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVariationDto } from './dto/create-variation.dto';
import { Variation } from './variation.entity';
import { SizeService } from 'src/size/size.service';

@Injectable()
export class VariationService {
  constructor(
    @InjectRepository(VariationRepository)
    private variationRepository: VariationRepository,
    private sizeService: SizeService,
  ) {}

  async createVariation(
    createVariationDto: CreateVariationDto,
  ): Promise<Variation> {
    return this.variationRepository.createVariation(createVariationDto);
  }

  async VarFindById(id: number): Promise<Variation> {
    const varia = await this.variationRepository.findOne(id);
    return varia;
  }

  async addSize(idV: number, idS: number): Promise<Variation> {
    const variation = await this.variationRepository.findOne(idV);
    const size = await this.sizeService.SizeFindById(idS);
    variation.size.push(size);
    variation.save();
    return variation;
  }

  async updateVar(id: number, createVariationDto: CreateVariationDto) {
    const variation = await this.VarFindById(id);
    const { color, image } = createVariationDto;
    if (color) {
      variation.color = color;
    }
    if (image) {
      variation.image = image;
    }

    await variation.save();
    return variation;
  }

  async suppressionVar(id: number) {
    const result = await this.variationRepository.delete(id);
  }
}
