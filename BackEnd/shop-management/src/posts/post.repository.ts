import { EntityRepository, Repository } from 'typeorm';
import { Poste } from './post.entity';

@EntityRepository(Poste)
export class PostRepository extends Repository<Poste> {}
