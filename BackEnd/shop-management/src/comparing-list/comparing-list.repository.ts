import { EntityRepository, Repository } from 'typeorm';
import { ComparingList } from './comparing-list.entity';

@EntityRepository(ComparingList)
export class ComparingRepository extends Repository<ComparingList> {}
