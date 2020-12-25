import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishListRepository } from './wish-list.repository';
import { WishList } from './wish-list.entity';
import { ClothesService } from 'src/clothes/clothes.service';

@Injectable()
export class WishListService {
  constructor(
    @InjectRepository(WishListRepository)
    private wishListRepository: WishListRepository,
    private clothesService: ClothesService,
  ) {}

  async addClothesToWishList(
    idClothes: number,
    idWishList: number,
  ): Promise<WishList> {
    const clothes = await this.clothesService.getClothesById(idClothes);
    const wish = await this.wishListRepository.findOne(idWishList);
    wish.clothes.push(clothes);
    wish.save();
    return wish;
  }

  async createWishList(): Promise<WishList> {
    const wish = new WishList();
    wish.save();
    return wish;
  }
}
