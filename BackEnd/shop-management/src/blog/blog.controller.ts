import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './blog.entity';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.createBlog(createBlogDto);
  }

  @Get()
  getBlogs(): Promise<Blog[]> {
    return this.blogService.getBlogs();
  }

  @Get('/:id')
  getBlogById(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
    return this.blogService.getBlogById(id);
  }

  @Patch('/:id')
  updateClothes(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<Blog> {
    return this.blogService.updateBlog(id, createBlogDto);
  }

  @Delete('/:id')
  deleteBlog(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.deleteBlog(id);
  }
}
