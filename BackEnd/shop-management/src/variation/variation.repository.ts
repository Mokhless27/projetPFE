import { EntityRepository, Repository } from 'typeorm';
import { Variation } from './variation.entity';
import { CreateVariationDto } from './dto/create-variation.dto';

@EntityRepository(Variation)
export class VariationRepository extends Repository<Variation> {
  async createVariation(
    createVariationDto: CreateVariationDto,
  ): Promise<Variation> {
    const { color, image } = createVariationDto;
    const varia = new Variation();
    varia.color = color;
    varia.image = image;
    await varia.save();
    return varia;
  }
}
