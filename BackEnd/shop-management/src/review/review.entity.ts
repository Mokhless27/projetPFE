import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Clothes } from 'src/clothes/clothes.entity';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @Column()
  rating: number;
  @Column({ type: 'timestamp', default: new Date() })
  time: string;

  @Column({ nullable: true })
  img: string;

  @ManyToOne(
    type => User,
    user => user.reviews,
    { eager: false },
  )
  user: User;

  @ManyToOne(
    type => Clothes,
    clothes => clothes.review,
    { eager: false },
  )
  clothes: Clothes;

  @Column({ nullable: true })
  clothesId: number;
}
