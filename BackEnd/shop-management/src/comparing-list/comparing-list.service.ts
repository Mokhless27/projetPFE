import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComparingRepository } from './comparing-list.repository';
import { ClothesService } from 'src/clothes/clothes.service';
import { ComparingList } from './comparing-list.entity';

@Injectable()
export class ComparingListService {
  constructor(
    @InjectRepository(ComparingRepository)
    private comparingRepository: ComparingRepository,
    private clothesService: ClothesService,
  ) {}

  async addClothesToCompare(
    idClothes: number,
    idCompList: number,
  ): Promise<ComparingList> {
    const clothes = await this.clothesService.getClothesById(idClothes);
    const comp = await this.comparingRepository.findOne(idCompList);
    comp.clothes.push(clothes);
    comp.save();
    return comp;
  }

  async createCompList(): Promise<ComparingList> {
    const comp = new ComparingList();
    comp.save();
    return comp;
  }
}
