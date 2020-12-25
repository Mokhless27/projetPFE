import { Module } from '@nestjs/common';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothesRepository } from './clothes.repository';
import { VariationModule } from 'src/variation/variation.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClothesRepository]),
    VariationModule,
    //AuthModule,
  ],
  controllers: [ClothesController],
  providers: [ClothesService],
  exports: [ClothesService],
})
export class ClothesModule {}
