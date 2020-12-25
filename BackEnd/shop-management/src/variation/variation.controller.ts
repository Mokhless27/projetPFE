import {
  Controller,
  Post,
  UsePipes,
  Body,
  ValidationPipe,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateVariationDto } from './dto/create-variation.dto';
import { VariationService } from './variation.service';
import { Variation } from './variation.entity';

@Controller('variation')
export class VariationController {
  constructor(private variationService: VariationService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createClothes(
    @Body() createVariationDto: CreateVariationDto,
  ): Promise<Variation> {
    return this.variationService.createVariation(createVariationDto);
  }

  @Patch('/:idV/:idS')
  addSize(
    @Param('idV', ParseIntPipe) idV: number,
    @Param('idS', ParseIntPipe) idS: number,
  ): Promise<Variation> {
    return this.variationService.addSize(idV, idS);
  }

  @Patch('/:id')
  updateVar(
    @Param('id', ParseIntPipe) id: number,
    @Body() createVariationDto: CreateVariationDto,
  ) {
    return this.variationService.updateVar(id, createVariationDto);
  }

  @Delete('/:id')
  suppressionVar(@Param('id', ParseIntPipe) id: number) {
    return this.variationService.suppressionVar(id);
  }
}
