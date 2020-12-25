import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeRepository } from './size.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SizeRepository])],
  controllers: [SizeController],
  providers: [SizeService],
  exports: [SizeService],
})
export class SizeModule {}
