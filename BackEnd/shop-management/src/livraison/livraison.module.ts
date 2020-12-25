import { Module } from '@nestjs/common';
import { LivraisonController } from './livraison.controller';
import { LivraisonService } from './livraison.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivraisonRepository } from './livraison.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LivraisonRepository])],
  controllers: [LivraisonController],
  providers: [LivraisonService],
})
export class LivraisonModule {}
