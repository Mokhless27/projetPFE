import {
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  Entity,
} from 'typeorm';
import { Clothes } from 'src/clothes/clothes.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class CartData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    type => Clothes,
    clothes => clothes.cartData,
    { eager: true },
  )
  clothes: Clothes[];

  @OneToOne(
    type => User,
    user => user.cartData,
  )
  user: User;
}
