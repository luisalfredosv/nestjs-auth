import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUSerDto: any): Promise<any> {
    console.log('data: ' + createUSerDto);

    const createdUser = new this.userModel(createUSerDto);
    return createdUser.save();
  }
  async findAll(): Promise<any[]> {
    return this.userModel.find().exec();
  }
  async findOne(username: string): Promise<any> {
    return this.userModel.findOne({ username: username });
  }
}
