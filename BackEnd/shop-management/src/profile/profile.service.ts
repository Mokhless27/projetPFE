import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UserRepository } from 'src/auth/user.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { pathToFileURL } from 'url';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async createProfile(
    user: User,
    createProfileDto: CreateProfileDto, //: Promise<Profile>
  ) {
    return this.profileRepository.createProfile(user, createProfileDto);
  }

  // async updateProfile(
  //   profile: Promise<Profile>,
  //   createProfileDto: CreateProfileDto,
  // ) {
  //   return this.profileRepository.updateProfile(profile, createProfileDto);
  // }

  async updateProf(id: number, createProfileDto: CreateProfileDto) {
    const profile = await this.profileRepository.findOne(id);
    const { fax, firstName, lastName, tel } = createProfileDto;

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

  async getCurrentProfile(id: number) {
    const profile = await this.profileRepository.findOne(id);
    return profile;
  }

  async createProf(user: User, createProfileDto: CreateProfileDto) {
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
    profile.user = user;

    await profile.save();
    return profile;
  }

  async updateAddress(id: number, createAddressDto: CreateAddressDto) {
    const profile = await this.profileRepository.findOne(id);
    const { address } = createAddressDto;
    profile.address = address;
    profile.save();
    return profile;
  }

  async updatePhoto(id: number, img: string) {
    console.log(img);
    const profile = await this.profileRepository.findOne(id);
    profile.img = img;
    profile.save();
    return profile;
  }
}
