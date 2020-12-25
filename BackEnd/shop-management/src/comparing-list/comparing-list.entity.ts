import {
  Entity,
  EntityRepository,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Clothes } from 'src/clothes/clothes.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class ComparingList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    type => Clothes,
    clothes => clothes.comparingList,
    { eager: true },
  )
  clothes: Clothes[];

  @OneToOne(
    type => User,
    user => user.comparingList,
  )
  user: User;
}
