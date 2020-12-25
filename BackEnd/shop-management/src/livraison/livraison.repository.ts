import { EntityRepository, Repository } from 'typeorm';
import { Livraison } from './livraison.entity';
import { CreateLivraisonDto } from './dto/create-livraison.dto';

@EntityRepository(Livraison)
export class LivraisonRepository extends Repository<Livraison> {
  async createLivraison(
    createLivraisonDto: CreateLivraisonDto,
  ): Promise<Livraison> {
    const {
      UserEmail,
      productColor,
      productName,
      productSize,
      productSku,
    } = createLivraisonDto;

    const l = new Livraison();
    l.UserEmail = UserEmail;

    l.productColor = productColor;
    l.productSku = productSku;

    l.productSize = productSize;
    l.productName = productName;

    await l.save();
    return l;
  }
}
