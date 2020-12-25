import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LivraisonService } from './livraison.service';
import { CreateLivraisonDto } from './dto/create-livraison.dto';
import { Livraison } from './livraison.entity';

@Controller('livraison')
export class LivraisonController {
  constructor(private livraisonService: LivraisonService) {}

  @Post()
  async createLivraison(
    @Body() createLivraisonDto: CreateLivraisonDto,
  ): Promise<Livraison> {
    return this.livraisonService.createLivraison(createLivraisonDto);
  }

  @Get()
  getLivraisons(): Promise<Livraison[]> {
    return this.livraisonService.getLivraisons();
  }

  @Delete('/:id')
  deleteLivraison(@Param('id', ParseIntPipe) id: number) {
    return this.livraisonService.deleteLivraison(id);
  }
}
