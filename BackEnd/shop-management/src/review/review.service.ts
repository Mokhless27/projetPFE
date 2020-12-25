import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthService } from 'src/auth/auth.service';
import { ClothesService } from 'src/clothes/clothes.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
    private userService: AuthService,
    private clothesService: ClothesService,
  ) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    idUser: number,
  ): Promise<Review> {
    const user = await this.userService.getUserById(idUser);
    const { rating, text } = createReviewDto;
    const review = new Review();
    review.text = text;
    review.rating = rating;
    review.user = user;
    await review.save();
    return review;
  }

  async getReviews(): Promise<Review[]> {
    return await this.reviewRepository.find({
      relations: ['user'],
      // join: {
      //   alias: 'user',
      //   leftJoinAndSelect: {
      //     profile: 'user.profileId',
      //   },
      // },
    });
  }

  async getReviewsByProduct(idClothes: number): Promise<Review[]> {
    return await this.reviewRepository.getReviewsByProduct(idClothes);
  }

  async createReviewByProduct(
    createReviewDto: CreateReviewDto,
    idUser: number,
    idProduct: number,
  ): Promise<Review> {
    const user = await this.userService.getUserById(idUser);
    const product = await this.clothesService.getClothesById(idProduct);

    const { rating, text, img } = createReviewDto;
    const review = new Review();
    review.text = text;
    review.rating = rating;
    review.img = img;
    review.user = user;
    await review.save();

    product.review.push(review);
    await product.save();

    return review;
  }
}
