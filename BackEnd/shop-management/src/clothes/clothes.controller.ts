import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { Clothes } from './clothes.entity';
import { Product } from 'src/products/products.entity';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Controller('clothes')
export class ClothesController {
  constructor(private clothesService: ClothesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createClothes(@Body() createClothesDto: CreateClothesDto): Promise<Clothes> {
    return this.clothesService.createClothes(createClothesDto);
  }

  @Get()
  getClothes(): Promise<Clothes[]> {
    return this.clothesService.getClothes();
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Clothes> {
    return this.clothesService.getClothesById(id);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clothesService.deleteClothes(id);
  }

  @Patch('/:id')
  updateClothes(
    @Param('id', ParseIntPipe) id: number,
    @Body() createClothesDto: CreateClothesDto,
  ): Promise<Clothes> {
    return this.clothesService.updateClothes(id, createClothesDto);
  }

  @Patch('/:idC/:idV')
  addVariation(
    @Param('idC', ParseIntPipe) idC: number,
    @Param('idV', ParseIntPipe) idV: number,
  ): Promise<Clothes> {
    return this.clothesService.addVariation(idC, idV);
  }

  @Post('/checkout')
  checkout(
    //@Body() amount: number,
    //@Body() token: any,
    @Body() createCheckoutDto: CreateCheckoutDto,
  ) {
    //const {product,token} = createCheckoutDto;
    return this.clothesService.checkout(createCheckoutDto);
  }
}
