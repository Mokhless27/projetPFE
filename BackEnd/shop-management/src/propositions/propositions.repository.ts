import { EntityRepository, Repository } from 'typeorm';
import { Proposition } from './propositions.entity';
import { CreatePropDto } from './dto/create-prop.dto';

@EntityRepository(Proposition)
export class PropositionRepository extends Repository<Proposition> {
  async createProposition(createPropDto: CreatePropDto): Promise<Proposition> {
    const { email, message, name, subject } = createPropDto;
    const p = new Proposition();
    p.email = email;
    p.message = message;
    p.name = name;
    p.subject = subject;

    await p.save();
    return p;
  }
}
