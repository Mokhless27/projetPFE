import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReponseRepository } from './reponse.repository';
import { Reponse } from './reponse.entity';
import { CreateReponseDto } from './dto/create-rep.dto';

@Injectable()
export class ReponseService {
  constructor(
    @InjectRepository(ReponseRepository)
    private reponseRepository: ReponseRepository,
  ) {}

  async createReponse(createreponseDto: CreateReponseDto): Promise<Reponse> {
    return this.reponseRepository.createReponse(createreponseDto);
  }
}
