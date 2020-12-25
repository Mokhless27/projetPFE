import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
  Column,
  OneToOne,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  lastName: string;
  //   @Column()
  //   email: string;
  @Column({ nullable: true })
  tel: number;
  @Column({ nullable: true })
  fax: number;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  img: string;
  //   @Column()
  //   password: string;
  // @Column({ nullable: true })
  // newPassword: string;
  // @Column({ nullable: true })
  // passwordConfirm: string;

  @OneToOne(
    type => User,
    user => user.profile,
  ) // specify inverse side as a second parameter
  user: User;
}
