import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Variation } from 'src/variation/variation.entity';
import { WishList } from 'src/wish-list/wish-list.entity';
import { CartData } from 'src/cart-data/cart-data.entity';
import { ComparingList } from 'src/comparing-list/comparing-list.entity';
import { User } from 'src/auth/user.entity';
import { Review } from 'src/review/review.entity';

@Entity()
export class Clothes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sku: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  discount: number;
  @Column({ type: 'timestamp', default: new Date() })
  offerEnd: string;
  @Column({ default: true })
  nEw: boolean;
  @Column({ default: 5 })
  rating: number;
  @Column({ default: 0 })
  saleCount: number;
  @Column('text', { array: true })
  category: string[];
  @Column('text', { array: true })
  tag: string[];
  // @Column('text', { array: true })
  // variation: {
  //   color: string;
  //   image: string;
  //   size: {
  //     name: string;
  //     stock: number;
  //   }[];
  // }[];

  @Column('text', { array: true })
  image: string[];
  @Column()
  shortDescription: string;
  @Column()
  fullDescription: string;

  @OneToMany(
    type => Variation,
    variation => variation.clothes,
    { eager: true },
  )
  variation: Variation[];

  @ManyToOne(
    type => WishList,
    wishList => wishList.clothes,
    { eager: false },
  )
  wishList: WishList;

  @ManyToOne(
    type => CartData,
    cartData => cartData.clothes,
    { eager: false },
  )
  cartData: CartData;

  @ManyToOne(
    type => ComparingList,
    comparingList => comparingList.clothes,
    { eager: false },
  )
  comparingList: CartData;

  // @ManyToMany(
  //   type => User,
  //   user => user.clothes,
  //   // { cascade: true },
  // )
  // //@JoinTable()
  // users: User[];

  @ManyToOne(
    type => User,
    user => user.clothes,
    { eager: false },
  )
  user: User;

  @OneToMany(
    type => Review,
    review => review.clothes,
    { eager: true },
  )
  review: Review[];
}
