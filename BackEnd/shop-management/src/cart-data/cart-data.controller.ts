import {
  Controller,
  Patch,
  Param,
  Post,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { CartDataService } from './cart-data.service';
import { CartData } from './cart-data.entity';
import { Clothes } from 'src/clothes/clothes.entity';

@Controller('cartdata')
export class CartDataController {
  constructor(private cartDataService: CartDataService) {}

  @Patch('/:idC/:idW')
  addClothesToWishList(
    @Param('idC', ParseIntPipe) idC: number,
    @Param('idW', ParseIntPipe) idW: number,
  ): Promise<Clothes> {
    return this.cartDataService.addClothesToCartData(idC, idW);
  }

  @Post()
  addCreateWishList(): Promise<CartData> {
    return this.cartDataService.createCart();
  }

  @Get('/:id')
  getCartById(@Param('id', ParseIntPipe) id: number) {
    return this.cartDataService.getCart(id);
  }
}
