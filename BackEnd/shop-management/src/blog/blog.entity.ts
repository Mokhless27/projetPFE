import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Commentaire } from 'src/commentaire/commentaire.entity';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  text: string;
  @Column({ type: 'timestamp', default: new Date() })
  time: string;
  @Column('text', { array: true, nullable: true })
  image: string[];

  @OneToMany(
    type => Commentaire,
    commentaire => commentaire.blog,
    { eager: true },
  )
  commentaire: Commentaire[];
}
