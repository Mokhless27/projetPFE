import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PreferenceRepository } from './preference.repository';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { Preference } from './preference.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectRepository(PreferenceRepository)
    private preferenceRepository: PreferenceRepository,
  ) {}

  async createPreference(
    user: User,
    createPreferenceDto: CreatePreferenceDto,
  ): Promise<Preference> {
    return this.preferenceRepository.createPreference(
      user,
      createPreferenceDto,
    );
  }

  async updatePref(
    id: number,
    createPreferenceDto: CreatePreferenceDto,
  ): Promise<Preference> {
    const preference = await this.preferenceRepository.findOne(id);
    const {
      color,
      dominateAccessorie,
      fashionable,
      moneySpendedByMonth,
      name,
      outwearTry,
      personality,
      steroitype,
      timesByMonth,
    } = createPreferenceDto;
    if (color) {
      preference.color = color;
    }
    if (dominateAccessorie) {
      preference.dominateAccessorie = dominateAccessorie;
    }
    if (fashionable) {
      preference.fashionable = fashionable;
    }
    if (moneySpendedByMonth) {
      preference.moneySpendedByMonth = moneySpendedByMonth;
    }
    if (name) {
      preference.name = name;
    }
    if (outwearTry) {
      preference.outwearTry = outwearTry;
    }
    if (personality) {
      preference.personality = personality;
    }
    if (steroitype) {
      preference.steroitype = steroitype;
    }
    if (timesByMonth) {
      preference.timesByMonth = timesByMonth;
    }

    await preference.save();
    return preference;
  }
}
