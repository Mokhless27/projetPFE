import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Livraison extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  UserEmail: string;
  @Column({ nullable: true })
  productName: string;
  @Column({ nullable: true })
  productSku: string;
  @Column({ nullable: true })
  productSize: string;
  @Column({ nullable: true })
  productColor: string;
  // @Column({ nullable: true })
  // UserAddress: string;
  // @Column({ nullable: true })
  // UserTel: string;
  @Column({ type: 'timestamp', default: new Date() })
  time: string;
}
