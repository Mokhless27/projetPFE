import { Module } from '@nestjs/common';
import { ReponseController } from './reponse.controller';
import { ReponseService } from './reponse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReponseRepository } from './reponse.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReponseRepository])],
  controllers: [ReponseController],
  providers: [ReponseService],
  exports: [ReponseService],
})
export class ReponseModule {}
