import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Poste } from './post.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postService: PostsService) {}

  // @Post()
  // @UsePipes(ValidationPipe)
  // createPost(
  //   @GetUser() user: User,
  //   @Body() createPostDto: CreatePostDto,
  // ): Promise<Poste> {
  //   return this.postService.createPost(createPostDto, user);
  // }
}
