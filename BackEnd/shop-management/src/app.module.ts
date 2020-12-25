import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { PostsModule } from './posts/posts.module';
import { ClothesModule } from './clothes/clothes.module';
import { ProfileModule } from './profile/profile.module';
import { VariationModule } from './variation/variation.module';
import { SizeModule } from './size/size.module';
import { BlogModule } from './blog/blog.module';
import { CommentaireModule } from './commentaire/commentaire.module';
import { ReponseModule } from './reponse/reponse.module';
import { WishListModule } from './wish-list/wish-list.module';
import { CartDataModule } from './cart-data/cart-data.module';
import { ComparingListModule } from './comparing-list/comparing-list.module';
import { CheckoutController } from './checkout/checkout.controller';
import { CheckoutService } from './checkout/checkout.service';
import { PreferenceModule } from './preference/preference.module';
import { ReviewModule } from './review/review.module';
import { MulterModule } from '@nestjs/platform-express';
import { LivraisonModule } from './livraison/livraison.module';
import { PropositionsModule } from './propositions/propositions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MulterModule.register({
      //dest: './uploads',
      //dest: `../../ups`,
      dest: `../../flone/public/assets/img`,
    }),
    AuthModule,
    ProductsModule,
    PostsModule,
    ClothesModule,
    ProfileModule,
    VariationModule,
    SizeModule,
    BlogModule,
    CommentaireModule,
    ReponseModule,
    WishListModule,
    CartDataModule,
    ComparingListModule,
    PreferenceModule,
    ReviewModule,
    LivraisonModule,
    PropositionsModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class AppModule {}
