import { Entity, EntityRepository, Repository } from 'typeorm';
import { WishList } from './wish-list.entity';

@EntityRepository(WishList)
export class WishListRepository extends Repository<WishList> {}
