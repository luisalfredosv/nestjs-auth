import { Injectable } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';

@Injectable()
export class ArticleService {
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, body: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} article`;
  // }
}
