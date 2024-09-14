import { Injectable, Logger } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../entity/user.repository';
import { UserException } from '../exception/UserException';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {
  }

  public async create(user: User) {
    this.logger.log('service, request to create a user');
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new UserException('User already exists', 404);
    }
    return await this.userRepository.create(user);
  }

  public async findById(userId: string) {
    this.logger.log('service, request to find user by id');
    return await this.userRepository.findById(userId);
  }

  public async update(user: User) {
    this.logger.log('service, request to update user');
    const foundUser = await this.userRepository.findById(user.id);
    if (!foundUser) {
      throw new Error('User not found');
    }
    return await this.userRepository.update(user);
  }

  public findAll() {
    this.logger.log('service, request to find all users');
    return this.userRepository.findAll();
  }

  public async delete(userId: string) {
    this.logger.log('service, request to delete user by id');
    return await this.userRepository.delete(userId);
  }
}
