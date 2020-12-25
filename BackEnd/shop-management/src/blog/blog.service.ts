import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogRepository)
    private blogRepository: BlogRepository,
  ) {}

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogRepository.createBlog(createBlogDto);
  }

  async getBlogs(): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async getBlogById(id: number): Promise<Blog> {
    const found = await this.blogRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return found;
  }

  async updateBlog(id: number, createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = await this.getBlogById(id);
    const { description, image, text, title } = createBlogDto;
    if (title) {
      blog.title = title;
    }
    if (text) {
      blog.text = text;
    }
    if (description) {
      blog.description = description;
    }

    if (image) {
      blog.image = image.split(',').map(image => image.trim());
    }
    await blog.save();
    return blog;
  }

  async deleteBlog(id: number) {
    const result = await this.blogRepository.delete(id);
  }
}
