import { Controller, Patch, ParseIntPipe, Param, Post } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { WishList } from './wish-list.entity';
import { WSAENETUNREACH } from 'constants';

@Controller('wishlist')
export class WishListController {
  constructor(private wishListService: WishListService) {}

  @Patch('/:idC/:idW')
  addClothesToWishList(
    @Param('idC', ParseIntPipe) idC: number,
    @Param('idW', ParseIntPipe) idW: number,
  ): Promise<WishList> {
    return this.wishListService.addClothesToWishList(idC, idW);
  }

  @Post()
  addCreateWishList(): Promise<WishList> {
    return this.wishListService.createWishList();
  }
}
