import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @Post('/:idUser')
  @UsePipes(ValidationPipe)
  CreateReviewDto(
    @Body() createReviewDto: CreateReviewDto,
    @Param('idUser', ParseIntPipe) idUser: number,
  ): Promise<Review> {
    return this.reviewService.createReview(createReviewDto, idUser);
  }

  @Get()
  getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Get('/:idClothes')
  getReviewsByProduct(
    @Param('idClothes', ParseIntPipe) idClothes: number,
  ): Promise<Review[]> {
    return this.reviewService.getReviewsByProduct(idClothes);
  }

  @Post('/:idUser/:idProduct')
  @UsePipes(ValidationPipe)
  CreateReview(
    @Body() createReviewDto: CreateReviewDto,
    @Param('idUser', ParseIntPipe) idUser: number,
    @Param('idProduct', ParseIntPipe) idProduct: number,
  ): Promise<Review> {
    return this.reviewService.createReviewByProduct(
      createReviewDto,
      idUser,
      idProduct,
    );
  }
}
