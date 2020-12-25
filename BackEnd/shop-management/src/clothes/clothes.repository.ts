import { EntityRepository, Repository } from 'typeorm';
import { Clothes } from './clothes.entity';
import { CreateClothesDto } from './dto/create-clothes.dto';

@EntityRepository(Clothes)
export class ClothesRepository extends Repository<Clothes> {
  async createClothes(createClothesDto: CreateClothesDto): Promise<Clothes> {
    const {
      category,
      discount,
      fullDescription,
      image,
      name,
      //nEw,
      //offerEnd,
      price,
      //rating,
      //saleCount,
      shortDescription,
      sku,
      tag,
      //  variation,
    } = createClothesDto;
    const clothes = new Clothes();
    clothes.name = name;
    //clothes.offerEnd = offerEnd;
    clothes.price = price;
    //clothes.rating = rating;
    //clothes.nEw = nEw;
    // clothes.saleCount = saleCount;
    clothes.shortDescription = shortDescription;
    clothes.fullDescription = fullDescription;
    clothes.sku = sku;
    clothes.discount = discount;

    clothes.tag = tag.split(',').map(tag => tag.trim());
    clothes.image = image.split(',').map(image => image.trim());
    clothes.category = category.split(',').map(category => category.trim());

    //clothes.variation = variation;

    await clothes.save();
    return clothes;
  }
}
