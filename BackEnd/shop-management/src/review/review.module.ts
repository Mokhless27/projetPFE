import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ClothesModule } from 'src/clothes/clothes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewRepository]),
    AuthModule,
    ClothesModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
