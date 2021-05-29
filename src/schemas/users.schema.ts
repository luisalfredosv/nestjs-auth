import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import { hash } from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: Boolean })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    // tslint:disable-next-line:no-string-literal
    const hashed = await hash(this['password'], 10);
    // tslint:disable-next-line:no-string-literal
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
