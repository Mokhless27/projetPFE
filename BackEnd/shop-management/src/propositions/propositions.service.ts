import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropositionRepository } from './propositions.repository';
import { CreatePropDto } from './dto/create-prop.dto';
import { Proposition } from './propositions.entity';

@Injectable()
export class PropositionsService {
  constructor(
    @InjectRepository(PropositionRepository)
    private propositionRepository: PropositionRepository,
  ) {}

  async createProposition(createPropDto: CreatePropDto): Promise<Proposition> {
    return this.propositionRepository.createProposition(createPropDto);
  }

  async getPropositions(): Promise<Proposition[]> {
    return await this.propositionRepository.find();
  }

  async deleteProposition(id: number) {
    const result = await this.propositionRepository.delete(id);
  }

  // async getPropositionById (id:number) : Promise<Proposition>{
  //    const found = await this.propositionRepository.findOne(id)
  //    if (!found) {
  //     throw new NotFoundException(`Proposition with ID ${id} not found`);
  //   }
  //   return found;
  // }
}
