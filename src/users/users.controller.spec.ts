import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Catherine' },
    ];
    const mockRepository = {
      provide: getRepositoryToken(User),
      useValue: {
        findOne: (id) => Promise.resolve(users.find((user) => user.id === id)),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, mockRepository],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('should return Alice', () => {
      return expect(usersService.findOne(1)).resolves.toStrictEqual({
        id: 1,
        name: 'Alice',
      });
    });
  });
});
