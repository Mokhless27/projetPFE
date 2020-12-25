import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Proposition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  subject: string;
  @Column({ nullable: true })
  message: string;
  @Column({ type: 'timestamp', default: new Date() })
  time: string;
}
