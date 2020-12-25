import { EntityRepository, Repository } from 'typeorm';
import { Review } from './review.entity';
import { User } from 'src/auth/user.entity';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  async getReviewsByProduct(clothesId: number): Promise<Review[]> {
    const query = this.createQueryBuilder('review');
    //.relation(Review, 'user');

    query.where('review.clothesId = :clothesId', { clothesId: clothesId });
    //query.relation(User, 'user').loadMany();
    const rv = await query.getMany();
    return rv;
  }
}
