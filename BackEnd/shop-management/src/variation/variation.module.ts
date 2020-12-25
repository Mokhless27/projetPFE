import { Module } from '@nestjs/common';
import { VariationController } from './variation.controller';
import { VariationService } from './variation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationRepository } from './variation.repository';
import { SizeModule } from 'src/size/size.module';

@Module({
  imports: [TypeOrmModule.forFeature([VariationRepository]), SizeModule],
  controllers: [VariationController],
  providers: [VariationService],
  exports: [VariationService],
})
export class VariationModule {}
