import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PropositionsService } from './propositions.service';
import { CreatePropDto } from './dto/create-prop.dto';
import { Proposition } from './propositions.entity';

@Controller('propositions')
export class PropositionsController {
  constructor(private propositionService: PropositionsService) {}

  @Post()
  async createPropsition(
    @Body() createPropDto: CreatePropDto,
  ): Promise<Proposition> {
    return this.propositionService.createProposition(createPropDto);
  }

  @Get()
  getPropositions(): Promise<Proposition[]> {
    return this.propositionService.getPropositions();
  }

  @Delete('/:id')
  deleteProposition(@Param('id', ParseIntPipe) id: number) {
    return this.propositionService.deleteProposition(id);
  }
}
