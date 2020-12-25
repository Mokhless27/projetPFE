import { EntityRepository, Repository } from 'typeorm';
import { Commentaire } from './commentaire.entity';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';

@EntityRepository(Commentaire)
export class CommentaireRepository extends Repository<Commentaire> {
  // async createCommentaire(
  //   createCommentaireDto: CreateCommentaireDto,
  //   idBlog: number,
  // ): Promise<Commentaire> {
  //   const { text } = createCommentaireDto;
  //   const comment = new Commentaire();
  //   comment.text = text;
  //   //comment.blog=idBlog;
  //   await comment.save();
  //   return comment;
  // }

  async getCommentaireByBlog(blogId: number): Promise<Commentaire[]> {
    const query = this.createQueryBuilder('commentaire'); // task key word referring to the task entity

    query.where('commentaire.blogId = :blogId', { blogId: blogId });

    const cmt = await query.getMany();
    return cmt;
  }
}
