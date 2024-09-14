import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { name: { type: 'string' }, email: { type: 'string' } },
      example: { name: 'Julien Hero', email: 'julien.hero@coding-way.com' },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createUser(@Body() userDto: UserDto) {
    return this.userService.create(userDto as User);
  }

  @Put()
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 200,
    description: 'User has been updated successfully',
    type: UserDto,
  })
  async updateUser(@Body() userDto: UserDto) {
    return this.userService.update(userDto as User);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiParam({ name: 'userId', type: String })
  @ApiResponse({
    status: 200,
    description: 'User has been found successfully',
    type: UserDto,
  })
  async getUserById(@Param('userId') userId: string) {
    return this.userService.findById(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: [UserDto],
  })
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'userId', type: String })
  @ApiResponse({
    status: 200,
    description: 'User has been deleted successfully',
  })
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
