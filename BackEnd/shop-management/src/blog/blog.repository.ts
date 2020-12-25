import { EntityRepository, Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    const { description, image, text, title } = createBlogDto;
    const blog = new Blog();
    blog.title = title;
    blog.text = text;
    blog.description = description;
    if (image) {
      blog.image = image.split(',').map(image => image.trim());
    }
    await blog.save();
    return blog;
  }
}
