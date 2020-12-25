import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDataRepository } from './cart-data.repository';
import { ClothesService } from 'src/clothes/clothes.service';
import { CartData } from './cart-data.entity';
import { Clothes } from 'src/clothes/clothes.entity';

@Injectable()
export class CartDataService {
  constructor(
    @InjectRepository(CartDataRepository)
    private cartDataRepository: CartDataRepository,
    private clothesService: ClothesService,
  ) {}

  async addClothesToCartData(
    idClothes: number,
    idCartData: number,
  ): Promise<Clothes> {
    const clothes = await this.clothesService.getClothesById(idClothes);
    const cart = await this.cartDataRepository.findOne(idCartData);
    cart.clothes.push(clothes);
    cart.save();
    console.log(clothes);
    return clothes;
  }

  async createCart(): Promise<CartData> {
    const cart = new CartData();
    cart.save();
    return cart;
  }

  async getCart(id: number) {
    const cart = await this.cartDataRepository.findOne(id);
    return cart;
  }
}
