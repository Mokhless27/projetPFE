import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Clothes } from 'src/clothes/clothes.entity';
import { Size } from 'src/size/size.entity';

@Entity()
export class Variation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  color: string;
  @Column()
  image: string;

  @ManyToOne(
    type => Clothes,
    clothes => clothes.variation,
    { eager: false },
  )
  clothes: Clothes;

  @OneToMany(
    type => Size,
    size => size.variation,
    { eager: true },
  )
  size: Size[];
}
