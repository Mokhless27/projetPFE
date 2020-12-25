import { Controller, Post, Patch, ParseIntPipe, Param } from '@nestjs/common';
import { ComparingListService } from './comparing-list.service';
import { ComparingList } from './comparing-list.entity';

@Controller('comparinglist')
export class ComparingListController {
  constructor(private comparingListService: ComparingListService) {}

  @Patch('/:idC/:idW')
  addClothesToWishList(
    @Param('idC', ParseIntPipe) idC: number,
    @Param('idW', ParseIntPipe) idW: number,
  ): Promise<ComparingList> {
    return this.comparingListService.addClothesToCompare(idC, idW);
  }

  @Post()
  addCreateWishList(): Promise<ComparingList> {
    return this.comparingListService.createCompList();
  }
}
