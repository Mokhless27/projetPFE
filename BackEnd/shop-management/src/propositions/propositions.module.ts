import { Module } from '@nestjs/common';
import { PropositionsController } from './propositions.controller';
import { PropositionsService } from './propositions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropositionRepository } from './propositions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PropositionRepository])],
  controllers: [PropositionsController],
  providers: [PropositionsService],
})
export class PropositionsModule {}
