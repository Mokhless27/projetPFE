import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { Commentaire } from './commentaire.entity';

@Controller('commentaire')
export class CommentaireController {
  constructor(private commentaireService: CommentaireService) {}

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  createComment(
    @Body() createCommentaireDto: CreateCommentaireDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Commentaire> {
    return this.commentaireService.createCommentaire(createCommentaireDto, id);
  }

  @Get('/:id')
  getCommentaireById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Commentaire[]> {
    return this.commentaireService.getCommentaireByBlog(id);
  }

  @Get()
  getComments(): Promise<Commentaire[]> {
    return this.commentaireService.getComments();
  }

  @Post('/:idUser/:idBlog')
  @UsePipes(ValidationPipe)
  createCommentByUser(
    @Body() createCommentaireDto: CreateCommentaireDto,
    @Param('idUser', ParseIntPipe) idUser: number,
    @Param('idBlog', ParseIntPipe) idBlog: number,
  ): Promise<Commentaire> {
    return this.commentaireService.createCommentaireByUser(
      createCommentaireDto,
      idUser,
      idBlog,
    );
  }
}
