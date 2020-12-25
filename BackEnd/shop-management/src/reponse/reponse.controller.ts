import {
  Controller,
  UsePipes,
  ValidationPipe,
  Body,
  Post,
} from '@nestjs/common';
import { ReponseService } from './reponse.service';
import { Reponse } from './reponse.entity';
import { CreateReponseDto } from './dto/create-rep.dto';

@Controller('reponse')
export class ReponseController {
  constructor(private reponseService: ReponseService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createComment(@Body() createreponseDto: CreateReponseDto): Promise<Reponse> {
    return this.reponseService.createReponse(createreponseDto);
  }
}
