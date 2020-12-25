import { Module } from '@nestjs/common';
import { WishListController } from './wish-list.controller';
import { WishListService } from './wish-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishListRepository } from './wish-list.repository';
import { ClothesService } from 'src/clothes/clothes.service';
import { ClothesModule } from 'src/clothes/clothes.module';

@Module({
  imports: [TypeOrmModule.forFeature([WishListRepository]), ClothesModule],
  controllers: [WishListController],
  providers: [WishListService],
  exports: [WishListService],
})
export class WishListModule {}
