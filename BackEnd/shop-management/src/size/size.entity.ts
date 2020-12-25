import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Variation } from 'src/variation/variation.entity';

@Entity()
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  stock: number;

  @ManyToOne(
    type => Variation,
    variation => variation.size,
    { eager: false },
  )
  variation: Variation;
}
