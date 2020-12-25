import * as bcrypt from 'bcryptjs';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
//import { Poste } from 'src/posts/post.entity';
//import { Comment } from '../posts/comment.entity';
import { Profile } from 'src/profile/profile.entity';
import { WishList } from 'src/wish-list/wish-list.entity';
import { CartData } from 'src/cart-data/cart-data.entity';
import { ComparingList } from 'src/comparing-list/comparing-list.entity';
import { Preference } from 'src/preference/preference.entity';
import { Clothes } from 'src/clothes/clothes.entity';
import { Review } from 'src/review/review.entity';
import { Commentaire } from 'src/commentaire/commentaire.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  role: string;

  @OneToMany(
    type => Commentaire,
    commentaire => commentaire.user,
    { eager: true },
  )
  commentaire: Commentaire[];

  @OneToOne(
    type => Profile,
    profile => profile.user,
  ) // specify inverse side as a second parameter
  @JoinColumn()
  profile: Profile;

  @Column({ nullable: true })
  profileId: number;

  /////
  @OneToOne(
    type => Preference,
    preference => preference.user,
  ) // specify inverse side as a second parameter
  @JoinColumn()
  preference: Preference;

  @Column({ nullable: true })
  preferenceId: number;

  ////

  @OneToOne(
    type => WishList,
    wishList => wishList.user,
  ) // specify inverse side as a second parameter
  @JoinColumn()
  wishList: WishList;

  @Column({ nullable: true })
  wishListId: number;

  @OneToOne(
    type => CartData,
    cartData => cartData.user,
  ) // specify inverse side as a second parameter
  @JoinColumn()
  cartData: CartData;

  @Column({ nullable: true })
  cartDataId: number;

  @OneToOne(
    type => ComparingList,
    comparingList => comparingList.user,
  ) // specify inverse side as a second parameter
  @JoinColumn()
  comparingList: ComparingList;

  @Column({ nullable: true })
  comparingListId: number;

  // @ManyToMany(
  //   type => Clothes,
  //   clothes => clothes.users,
  //   { cascade: true },
  // )
  // @JoinTable()
  // clothes: Clothes[];

  @OneToMany(
    type => Clothes,
    clothes => clothes.user,
    { eager: true },
  )
  clothes: Clothes[];

  @OneToMany(
    type => Review,
    review => review.user,
    { eager: true },
  )
  reviews: Review[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
