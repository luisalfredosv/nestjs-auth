import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUSerDto: any): Promise<any> {
    const findUser = await this.findOne(createUSerDto.username);
    if (findUser) {
      throw new BadRequestException(`User exist's`);
    }

    const createdUser = new this.userModel(createUSerDto);
    const createdResult: UserDocument = await createdUser.save();
    return {
      message: `Registred complete!`,
    };
  }
  async findAll(): Promise<any[]> {
    return this.userModel.find().exec();
  }
  async findOne(username: string): Promise<any> {
    return this.userModel.findOne({ username });
  }
}
