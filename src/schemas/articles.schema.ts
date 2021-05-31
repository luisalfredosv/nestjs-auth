import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article extends Document {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ type: Boolean })
  isPublished: boolean;

  @Prop()
  authorId: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
