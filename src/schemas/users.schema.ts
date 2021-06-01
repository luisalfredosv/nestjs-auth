import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';


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
    const salt = await bcrypt.genSalt(10);
    // tslint:disable-next-line:no-string-literal
    const hashed = await bcrypt.hash(this.password, salt);
    // tslint:disable-next-line:no-string-literal
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
      delete ret.password;
      return ret;
  }
});


UserSchema.methods.comparePassword = async (candidatePassword: string, userPassword: string) => {
  return await bcrypt.compare(candidatePassword, userPassword); 
};