import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '../entity/user.repository';
import { User } from '../entity/user.entity';

describe('UserService', () => {
  let userService: UserService;

  const mockUserRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
  };

  const user = {
    _id: '1',
    name: 'Julien Hero',
    email: 'Julien.hero@coding-way.com',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = await moduleRef.get<UserService>(UserService);
  });

  describe('create user', () => {
    it('should create a new user', async () => {
      // Given
      mockUserRepository.findByEmail.mockResolvedValue(undefined);
      mockUserRepository.create.mockResolvedValue(user);

      // When
      const createdUser = await userService.create(user as User);

      // Then
      expect(createdUser).toEqual(user);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(user.email);
      expect(mockUserRepository.create).toHaveBeenCalledWith(user);
    });

    it('should throw an error when the email already exists', async () => {
      // Given
      mockUserRepository.findByEmail.mockResolvedValue(user);

      // When
      await expect(userService.create(user as User)).rejects.toThrow(
        BadRequestException,
      );

      // Then
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(user.email);
    });
  });

  describe('findById', () => {
    it('should return a user ;)', async () => {
      // Given
      mockUserRepository.findById.mockResolvedValue(user);

      // When
      const result = await userService.findById(user._id);

      // Then
      expect(result).toEqual(user);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(user._id);
    });

    it('should return null if user is not found by id ;)', async () => {
      // Given
      mockUserRepository.findById.mockResolvedValue(null);

      // When
      const result = await userService.findById(':(');

      // Then
      expect(result).toBeNull();
    });
  });

  describe('update user', () => {
    it('should update an existing user :)', async () => {
      // Given
      mockUserRepository.findById.mockResolvedValue(user);
      mockUserRepository.update.mockResolvedValue(user);

      // When
      const result = await userService.update(user as User);

      // Then
      expect(result).toEqual(user);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(user._id);
      expect(mockUserRepository.update).toHaveBeenCalledWith(user);
    });

    it('should throw NotFoundException if the user does not exist :(', async () => {
      // Given
      mockUserRepository.findById.mockResolvedValue(null);

      // When
      await expect(userService.update(user as User)).rejects.toThrow(
        NotFoundException,
      );

      // Then
      expect(mockUserRepository.findById).toHaveBeenCalledWith(user._id);
    });
  });

  describe('delete user', () => {
    // Given
    it('should delete a user by id', async () => {
      mockUserRepository.delete.mockResolvedValue(true);

      // When
      const result = await userService.delete(user._id);

      // Then
      expect(result).toEqual(true);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(user._id);
    });
  });

  describe('fetch all users', () => {
    it('should return all users', async () => {
      // Given
      mockUserRepository.findAll.mockResolvedValue([user]);

      // When
      const result = await userService.findAll();

      // Then
      expect(result).toEqual([user]);
      expect(mockUserRepository.findAll).toHaveBeenCalled();
    });
  });
});
