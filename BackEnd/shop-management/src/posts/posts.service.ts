import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { Poste } from './post.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  // async createPost(createPostDto: CreatePostDto, user: User): Promise<Poste> {
  //   const { text } = createPostDto;
  //   const post = new Poste();
  //   post.text = text;
  //   post.user = user;
  //   post.userId = user.id;
  //   post.save();
  //   return post;
  // }
}
