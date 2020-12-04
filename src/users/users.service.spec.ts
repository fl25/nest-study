import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeAll(async () => {
    let users: User[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Catherine' },
    ];
    const mockRepository = {
      // 差し替える対象のリポジトリ（User）を選択
      provide: getRepositoryToken(User),
      useValue: {
        insert: (user: User) => users.push(user),
        find: () => Promise.resolve(users),
        findOne: (id: number) =>
          Promise.resolve(users.find((user) => user.id === id)),
        update: (id: number, newUser: User) =>
          (users = users.map((user) => (user.id === id ? newUser : user))),
        delete: (id: number) =>
          (users = users.filter((user) => user.id !== id)),
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
