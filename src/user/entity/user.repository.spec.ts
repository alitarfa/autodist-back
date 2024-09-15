import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

describe('UserRepository', () => {
  let repository: UserRepository;

  const mockUser = {
    _id: '1',
    name: 'Julien hero',
    email: 'julien.hero@coding-way.com',
  } as User;

  const mockUserModel = {
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    repository = await module.get<UserRepository>(UserRepository);
  });

  it('should save a user', async () => {
    // Given
    mockUserModel.create.mockReturnValue(mockUser);
    // When
    const result = await repository.create(mockUser);

    // Then
    expect(mockUserModel.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should find a user by id', async () => {
    // Given
    mockUserModel.findById.mockReturnValue(mockUser);

    // When
    await repository.findById('123456789098765432167898');

    // Then
    expect(mockUserModel.findById).toHaveBeenCalled();
  });

  it('should update a user', async () => {
    // Given
    mockUserModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    // When
    const result = await repository.update(mockUser);

    // Then
    expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
      mockUser._id,
      mockUser,
    );
    expect(result).toEqual(mockUser);
  });

  it('should delete a user', async () => {
    // Given
    mockUserModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    // When
    const result = await repository.delete(mockUser._id);

    // Then
    expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith(mockUser._id);
    expect(result).toEqual(mockUser);
  });

  it('should find a user by email', async () => {
    // Given
    mockUserModel.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    // When
    const result = await repository.findByEmail(mockUser.email);

    // Then
    expect(mockUserModel.findOne).toHaveBeenCalledWith({
      email: mockUser.email,
    });
    expect(result).toEqual(mockUser);
  });

  it('should find all users', async () => {
    // Given
    const mockUsers = [mockUser];
    mockUserModel.find.mockResolvedValueOnce(mockUsers);

    // When
    const result = await repository.findAll();

    // Then
    expect(result).toEqual([
      {
        _id: '1',
        email: 'julien.hero@coding-way.com',
        name: 'Julien hero',
      },
    ]);
  });
});
