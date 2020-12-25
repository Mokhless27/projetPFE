import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Commentaire } from 'src/commentaire/commentaire.entity';

@Entity()
export class Reponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;

  // @ManyToOne(
  //   type => Commentaire,
  //   commentaire => commentaire.reponse,
  //   { eager: false },
  // )
  // commentaire: Commentaire;
}
