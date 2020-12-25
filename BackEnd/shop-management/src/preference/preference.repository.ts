import { EntityRepository, Repository } from 'typeorm';
import { Preference } from './preference.entity';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Preference)
export class PreferenceRepository extends Repository<Preference> {
  async createPreference(
    user: User,
    createPreferenceDto: CreatePreferenceDto,
  ): Promise<Preference> {
    const {
      color,
      dominateAccessorie,
      moneySpendedByMonth,
      outwearTry,
      personality,
      steroitype,
      timesByMonth,
      fashionable,
      name,
    } = createPreferenceDto;

    const p = new Preference();

    p.color = color;
    p.dominateAccessorie = dominateAccessorie;
    p.moneySpendedByMonth = moneySpendedByMonth;
    p.steroitype = steroitype;
    p.timesByMonth = timesByMonth;
    p.outwearTry = outwearTry;
    p.personality = personality;
    p.fashionable = fashionable;
    p.name = name;
    p.user = user;

    await p.save();
    return p;
  }
}
