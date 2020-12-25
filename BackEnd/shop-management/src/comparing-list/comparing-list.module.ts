import { Module } from '@nestjs/common';
import { ComparingListService } from './comparing-list.service';
import { ComparingListController } from './comparing-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComparingRepository } from './comparing-list.repository';
import { ClothesModule } from 'src/clothes/clothes.module';

@Module({
  imports: [TypeOrmModule.forFeature([ComparingRepository]), ClothesModule],
  providers: [ComparingListService],
  controllers: [ComparingListController],
})
export class ComparingListModule {}
