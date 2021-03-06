import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LoginBodyDTO } from './dto/login.dto';

describe('UserService', () => {
  let service: UserService;

  const jwtSecret = 'abcd';
  const users: User[] = [
    plainToClass(User, {
      id: 1,
      username: 'test',
      password: '$2a$12$ED/XP8jFfn5LL0cNl1Razebd1vxsOr4mFYo7bHDkBbQTEBWS0cqES',
    }),
  ];

  const mockedRepo = {
    findOne: jest.fn(
      (options: { where: { username: string }; select: string[] }) =>
        Promise.resolve(
          users.find((user) => user.username === options.where.username),
        ),
    ),
    create: jest.fn((user: LoginBodyDTO) => plainToClass(User, user)),
    save: jest.fn((user: User) => {
      user.id = 2;
      user.createdAt = new Date();

      return Promise.resolve(user);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return authentication data and valid token ', async () => {
    const { user, access_token } = await service.login(users[0]);

    expect(user).toBeDefined();
    expect(access_token).toBeDefined();

    expect(jwt.verify(access_token, jwtSecret)).toBeTruthy();
    expect(user.id).toBe(users[0].id);
    expect(user.username).toBe(users[0].username);
    expect(user.createdAt).toBe(users[0].createdAt);
  });

  it('should return null if wrong password is provided ', async () => {
    const user = await service.validateUser('test', 'test1');

    expect(user).toBeNull();

    expect(mockedRepo.findOne).toHaveBeenCalled();
  });

  it('should return null if wrong username is provided ', async () => {
    const user = await service.validateUser('test1', 'test');

    expect(user).toBeNull();

    expect(mockedRepo.findOne).toHaveBeenCalled();
  });

  it('should validate user if correct credentials are provided', async () => {
    const user = await service.validateUser('test', 'test');

    expect(mockedRepo.findOne).toHaveBeenCalled();

    expect(user).toBeTruthy();

    expect(user.id).toBe(users[0].id);
    expect(user.username).toBe(users[0].username);
    expect(user.createdAt).toBe(users[0].createdAt);
  });

  it('should create a new user with corresponding data and hashing the password', async () => {
    const newUserData: LoginBodyDTO = {
      username: 'test2',
      password: 'test2',
    };

    const hashSpy = jest.spyOn(bcrypt, 'hash');

    const user = await service.create(newUserData);

    expect(mockedRepo.create).toHaveBeenCalled();
    expect(mockedRepo.save).toHaveBeenCalled();
    expect(hashSpy).toHaveBeenCalled();

    expect(user).toBeDefined();
    expect(user.username).toBe(newUserData.username);
    expect(typeof user.password).toBe('string');
  });
});
