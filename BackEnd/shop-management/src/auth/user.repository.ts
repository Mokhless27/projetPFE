import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<number> {
    const { username, email, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.HashPassword(password, user.salt);
    try {
      await user.save();
      return user.id;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email , username
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<string> {
    const { email, password } = loginCredentialsDto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async hasAProfile(user: User) {
    const query = this.createQueryBuilder('user').leftJoinAndSelect(
      'user.profile',
      'profile',
    );
    const users = await query.getMany();
    const found = users.filter(u => u.id === user.id);
    const b = found.map(f => {
      if (f.profileId) {
        return true;
      }
      return false;
    });

    return b[0];
  }

  async getTheProfileByUser(user: User) {
    const query = this.createQueryBuilder('user').leftJoinAndSelect(
      'user.profile',
      'profile',
    );
    const users = await query.getMany();
    const found = users.filter(u => u.id === user.id);
    const profile = found.map(f => f.profile);
    return profile[0];
  }

  async HashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
