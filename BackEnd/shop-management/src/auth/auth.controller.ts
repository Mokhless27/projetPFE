import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { PasswordCredentialsDto } from './dto/change-password.dto';
import { HashCredentialsDto } from './dto/hash-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ token: string }> {
    return this.authService.signIn(loginCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User): Promise<User> {
    return this.authService.getUser(user);
  }

  @Get('/hasProfile')
  @UseGuards(AuthGuard())
  hasAprofile(@GetUser() user: User) {
    return this.authService.hasAProfile(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfileByUser(@GetUser() user: User) {
    return this.authService.getProfileByUser(user);
  }

  @Patch('/password/:id')
  @UseGuards(AuthGuard())
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() passwordCredentialsDto: PasswordCredentialsDto,
  ) {
    const { password } = passwordCredentialsDto;
    return this.authService.changePassword(id, password);
  }

  // @Post('/hash')
  // @UseGuards(AuthGuard())
  // hashPassword(@Body(ValidationPipe) hashCredentialsDto: HashCredentialsDto) {
  //   return this.authService.hash(
  //     hashCredentialsDto.password,
  //     hashCredentialsDto.salt,
  //   );
  // }

  @Patch('/achat/:idUser/:idClothes')
  achatProduit(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Param('idClothes', ParseIntPipe) idClothes: number,
  ) {
    return this.authService.achatProduit(idUser, idClothes);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteUser(id);
  }
}
