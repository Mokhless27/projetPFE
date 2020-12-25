import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { PasswordCredentialsDto } from './dto/change-password.dto';
import { WishListService } from 'src/wish-list/wish-list.service';
import { WishList } from 'src/wish-list/wish-list.entity';
import { WishListModule } from 'src/wish-list/wish-list.module';
import { ComparingList } from 'src/comparing-list/comparing-list.entity';
import { CartData } from 'src/cart-data/cart-data.entity';
import { ClothesService } from 'src/clothes/clothes.service';
import { Clothes } from 'src/clothes/clothes.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private wishListService: WishListService,
    private clothesService: ClothesService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    const idUser = await this.userRepository.signUp(authCredentialsDto);
    //console.log(idUser)
    const { username } = authCredentialsDto;
    const payload: JwtPayload = { username };
    const token = await this.jwtService.sign(payload);
    await this.createWishList(idUser);
    await this.createCarteList(idUser);
    await this.createComparingList(idUser);
    return { token };
  }

  async signIn(
    logincredentialsDto: LoginCredentialsDto,
  ): Promise<{ token: string }> {
    const username = await this.userRepository.validateUserPassword(
      logincredentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { username };
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  async getUser(user: User): Promise<User> {
    return user;
  }

  async hasAProfile(user: User) {
    return this.userRepository.hasAProfile(user);
  }

  async getProfileByUser(user: User) {
    return this.userRepository.getTheProfileByUser(user);
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne(userId);
    return user;
  }

  async changePassword(id: number, password: string) {
    const user = await this.userRepository.findOne(id);
    const p = await this.userRepository.HashPassword(password, user.salt);
    user.password = p;
    await user.save();
    return user;
  }

  // async hash(p: string, s: string) {
  //   return this.userRepository.HashPassword(p, s);
  // }

  async createWishList(id) {
    const u = await this.userRepository.findOne(id);
    const wish = new WishList();
    wish.user = u;
    wish.save();
    return wish;
  }

  //***************************** */

  async createComparingList(id) {
    const u = await this.userRepository.findOne(id);
    const comp = new ComparingList();
    comp.user = u;
    comp.save();
    return comp;
  }

  async createCarteList(id) {
    const u = await this.userRepository.findOne(id);
    const comp = new CartData();
    comp.user = u;
    comp.save();
    return comp;
  }

  async achatProduit(idUser: number, idClothes: number): Promise<Clothes> {
    const u = await this.userRepository.findOne(idUser);
    const c = await this.clothesService.getClothesById(idClothes);
    c.user = u;
    c.save();
    return c;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['profile'],
    });
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete(id);
  }
}
