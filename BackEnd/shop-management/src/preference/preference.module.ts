import { Module } from '@nestjs/common';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceRepository } from './preference.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PreferenceRepository]), AuthModule],
  controllers: [PreferenceController],
  providers: [PreferenceService],
})
export class PreferenceModule {}
