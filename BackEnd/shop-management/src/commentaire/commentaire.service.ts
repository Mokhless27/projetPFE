import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { CommentaireRepository } from './commentaire.repository';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { Commentaire } from './commentaire.entity';
import { BlogService } from 'src/blog/blog.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CommentaireService {
  constructor(
    @InjectRepository(CommentaireRepository)
    private commentaireRepository: CommentaireRepository,
    private userService: AuthService,
    private blogService: BlogService,
  ) {}

  async createCommentaire(
    createCommentaireDto: CreateCommentaireDto,
    idBlog: number,
  ): Promise<Commentaire> {
    const blog = await this.blogService.getBlogById(idBlog);
    const { text } = createCommentaireDto;
    const comment = new Commentaire();
    comment.text = text;
    //comment.blog = blog;
    await comment.save();
    blog.commentaire.push(comment);

    await blog.save();
    return comment;
  }

  async getCommentaireByBlog(
    idBlog: number, //: Promise<Commentaire>
  ): Promise<Commentaire[]> {
    return this.commentaireRepository.getCommentaireByBlog(idBlog);
  }

  async createCommentaireByUser(
    createCommentaireDto: CreateCommentaireDto,
    idUser: number,
    idBlog: number,
  ): Promise<Commentaire> {
    const blog = await this.blogService.getBlogById(idBlog);
    const user = await this.userService.getUserById(idUser);
    const { text, img } = createCommentaireDto;
    const comment = new Commentaire();
    comment.text = text;
    comment.img = img;
    comment.user = user;
    await comment.save();

    blog.commentaire.push(comment);
    await blog.save();
    return comment;
  }

  async getComments(): Promise<Commentaire[]> {
    return await this.commentaireRepository.find({ relations: ['user'] });
  }
}
