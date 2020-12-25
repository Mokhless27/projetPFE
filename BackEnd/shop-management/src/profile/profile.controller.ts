import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
  Get,
  ParseIntPipe,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { CreateAddressDto } from './dto/create-address.dto';
import {
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  // @Post()
  // @UseGuards(AuthGuard())
  // @UsePipes(ValidationPipe)
  // async createOrUpdateAProfile(
  //   @GetUser() user: User,
  //   @Body() createProfileDto: CreateProfileDto, //: Promise<Profile>
  // ) {
  //   if (user.profileId) {
  //     const profile = await this.authService.getProfileByUser(user);
  //     //return this.profileService.updateProfile(profile, createProfileDto);
  //     console.log(profile);
  //     return this.profileService.updateProf(profile.id, createProfileDto);
  //   }
  //   return this.profileService.createProfile(user, createProfileDto);
  // }

  @Post('/:idP')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async createOrUpdateAProfile(
    @Param('idP', ParseIntPipe) idP: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.updateProf(idP, createProfileDto);
  }

  @Get('/me/:id')
  @UseGuards(AuthGuard())
  getCurrentProfile(
    // @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.profileService.getCurrentProfile(id);
  }

  @Post('/user/:idU')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async createAProfile(
    @Param('idU', ParseIntPipe) idU: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const user = await this.authService.getUserById(idU);
    console.log(user);
    return this.profileService.createProf(user, createProfileDto);
  }

  @Patch('/address/:idP')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async updateAddress(
    @Param('idP', ParseIntPipe) idP: number,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.profileService.updateAddress(idP, createAddressDto);
  }

  @Patch('/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], {
      //dest: 'uploads',
      dest: `../../flone/public/assets/img`,
    }),
  )
  uploadFile(@UploadedFiles() image, @Param('id', ParseIntPipe) id: number) {
    // const path =
    //   'C:\\Users\\Lenovo\\Desktop\\template\\Flone\\BackEnd\\shop-management\\' +
    //   image.image[0].path;
    return this.profileService.updatePhoto(id, image.image[0].path);
    //return { content: JSON.stringify(image), exists: Boolean(image) };
    //return image.image[0].originalname;
  }
}
