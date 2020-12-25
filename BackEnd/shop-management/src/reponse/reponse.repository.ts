import { EntityRepository, Repository } from 'typeorm';
import { Reponse } from './reponse.entity';
import { CreateReponseDto } from './dto/create-rep.dto';

@EntityRepository(Reponse)
export class ReponseRepository extends Repository<Reponse> {
  async createReponse(createreponseDto: CreateReponseDto) {
    const { text } = createreponseDto;
    const reponse = new Reponse();
    reponse.text = text;
    await reponse.save();
    return reponse;
  }
}
