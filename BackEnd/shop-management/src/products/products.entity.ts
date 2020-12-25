import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Double,
  OneToMany,
} from 'typeorm';
import { ProductSize, ProductGender } from './products.enum';
//import { Poste } from 'src/posts/post.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
  @Column('text', { array: true })
  size: string[];
  @Column('text', { array: true })
  color: string[];
  @Column()
  gender: ProductGender;
  @Column()
  price: number;
  @Column('text', { array: true })
  img: string[];
  @Column()
  rating: number;
  @Column('text', { array: true })
  tags: string[];
}
