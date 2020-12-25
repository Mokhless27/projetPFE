import { EntityRepository, Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/auth/user.entity';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async createProfile(
    user: User,
    createProfileDto: CreateProfileDto, //: Promise<Profile>
  ) {
    const { fax, firstName, lastName, tel } = createProfileDto;
    const profile = new Profile();
    if (firstName) {
      profile.firstName = firstName;
    }
    if (lastName) {
      profile.lastName = lastName;
    }
    if (tel) {
      profile.tel = tel;
    }
    if (fax) {
      profile.fax = fax;
    }
    // if (address) {
    //   profile.address = address;
    // }
    profile.user = user;
    await profile.save();
    return profile;
  }

  // async updateProfile(
  //   profile: Promise<Profile>,
  //   createProfileDto: CreateProfileDto,
  // ) {
  //   const { fax, firstName, lastName, tel } = createProfileDto;

  //   if (firstName) {
  //     (await profile).firstName = firstName;
  //   }
  //   if (lastName) {
  //     (await profile).lastName = lastName;
  //   }
  //   if (tel) {
  //     (await profile).tel = tel;
  //   }
  //   if (fax) {
  //     (await profile).fax = fax;
  //   }
  //   // if (address) {
  //   //   (await profile).address = address;
  //   // }
  //   (await profile).save();
  //   return profile;
  // }

  async updateProf(id: number, createProfileDto: CreateProfileDto) {
    const { fax, firstName, lastName, tel } = createProfileDto;
    const query = this.createQueryBuilder('profil'); // task key word referring to the task entity

    query.where('profil.id = :idP', { idP: id });

    const profile = await query.getOne();
    if (firstName) {
      profile.firstName = firstName;
    }
    if (lastName) {
      profile.lastName = lastName;
    }
    if (tel) {
      profile.tel = tel;
    }
    if (fax) {
      profile.fax = fax;
    }

    await profile.save();
    return profile;
  }
}
