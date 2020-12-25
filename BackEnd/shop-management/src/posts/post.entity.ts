import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Poste extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: string;

  // @ManyToOne(
  //   type => User,
  //   user => user.posts,
  //   { eager: false },
  // )
  // user: User;

  // @Column()
  // userId: number;
}
