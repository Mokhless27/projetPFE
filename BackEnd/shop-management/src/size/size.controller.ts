import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { Size } from './size.entity';

@Controller('size')
export class SizeController {
  constructor(private sizeservice: SizeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createSize(@Body() createSizeDto: CreateSizeDto): Promise<Size> {
    return this.sizeservice.createSize(createSizeDto);
  }

  @Patch('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<Size> {
    return this.sizeservice.deleteSize(id);
  }

  @Patch('/size/:id')
  updateSize(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSizeDto: CreateSizeDto,
  ) {
    return this.sizeservice.updateSize(id, createSizeDto);
  }

  @Delete('/:id')
  suppressionSize(@Param('id', ParseIntPipe) id: number) {
    return this.sizeservice.suppressionSize(id);
  }
}
