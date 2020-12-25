import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LivraisonRepository } from './livraison.repository';
import { Livraison } from './livraison.entity';
import { CreateLivraisonDto } from './dto/create-livraison.dto';

@Injectable()
export class LivraisonService {
  constructor(
    @InjectRepository(LivraisonRepository)
    private livraisonRepository: LivraisonRepository,
  ) {}

  async createLivraison(
    createLivraisonDto: CreateLivraisonDto,
  ): Promise<Livraison> {
    return this.livraisonRepository.createLivraison(createLivraisonDto);
  }

  async getLivraisons(): Promise<Livraison[]> {
    return await this.livraisonRepository.find();
  }

  async deleteLivraison(id: number) {
    const result = await this.livraisonRepository.delete(id);
  }
}
