import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Action } from 'src/casl/action';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateArticleDto, @Req() req) {
    // const ability = this.caslAbilityFactory.createForUser(user);
    // if (ability.can(Action.Read, 'all')) {
    //   // "user" has read access to everything
    // }

    return this.articleService.create(body);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.articleService.remove(+id);
  // }
}
