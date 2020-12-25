import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
//import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileRepository]),
    // MulterModule.register({
    //   dest: '../../uploads',
    // }),
    AuthModule,
  ],

  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
