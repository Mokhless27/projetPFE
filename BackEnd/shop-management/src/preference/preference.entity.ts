import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Preference extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  color: string;
  @Column({ nullable: true })
  moneySpendedByMonth: string;
  @Column({ nullable: true })
  timesByMonth: string;
  // @Column({ nullable: true })
  // fashion: boolean;
  @Column({ nullable: true })
  personality: string;
  @Column({ nullable: true })
  dominateAccessorie: string;
  @Column({ nullable: true })
  outwearTry: string;
  @Column({ nullable: true })
  steroitype: string;
  @Column({ nullable: true })
  fashionable: string;
  @Column({ nullable: true })
  name: string;

  @OneToOne(
    type => User,
    user => user.preference,
  ) // specify inverse side as a second parameter
  user: User;
}
