import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async create(user: User) {
    return this.userModel.create(user);
  }

  async findById(id: string) {
    return this.userModel.findById(new Types.ObjectId(id));
  }

  async update(user: User) {
    return this.userModel.findByIdAndUpdate(user._id, user).exec();
  }

  async delete(userId: string) {
    return this.userModel.findByIdAndDelete(userId).exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll() {
    return this.userModel.find({});
  }
}
