import { Entity, EntityRepository, Repository } from 'typeorm';
import { CartData } from './cart-data.entity';

@EntityRepository(CartData)
export class CartDataRepository extends Repository<CartData> {}
