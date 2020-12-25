import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Reponse } from 'src/reponse/reponse.entity';
import { Blog } from 'src/blog/blog.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Commentaire extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @Column({ type: 'timestamp', default: new Date() })
  time: string;
  @Column({ nullable: true })
  img: string;

  // @OneToMany(
  //   type => Reponse,
  //   reponse => reponse.commentaire,
  //   { eager: true },
  // )
  // reponse: Reponse[];

  @ManyToOne(
    type => Blog,
    blog => blog.commentaire,
    { eager: false },
  )
  blog: Blog;

  @Column({ nullable: true })
  blogId: number;

  @ManyToOne(
    type => User,
    user => user.commentaire,
    { eager: false },
  )
  user: User;

  @Column({ nullable: true })
  userId: number;
}
