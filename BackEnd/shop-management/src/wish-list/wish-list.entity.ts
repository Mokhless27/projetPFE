import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Clothes } from 'src/clothes/clothes.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class WishList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    type => Clothes,
    clothes => clothes.wishList,
    { eager: true },
  )
  clothes: Clothes[];

  @OneToOne(
    type => User,
    user => user.wishList,
  )
  user: User;
}
