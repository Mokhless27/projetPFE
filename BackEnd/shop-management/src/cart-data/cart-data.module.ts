import { Module } from '@nestjs/common';
import { CartDataService } from './cart-data.service';
import { CartDataController } from './cart-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartDataRepository } from './cart-data.repository';
import { ClothesModule } from 'src/clothes/clothes.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartDataRepository]), ClothesModule],
  providers: [CartDataService],
  controllers: [CartDataController],
})
export class CartDataModule {}
