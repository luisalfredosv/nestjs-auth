import { IsBoolean, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  authorId: string;

  @IsBoolean()
  isPublished: boolean;
}

export class UpdateArticleDto extends OmitType(CreateArticleDto, [] as const) {
  _id: string;
}
