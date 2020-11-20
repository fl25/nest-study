import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Catherine' },
  ];

  create(user: User) {
    this.users.push(user);
    return this.users;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((value) => value.id === id);
  }

  update(id: number, user: User) {
    this.users = this.users.map((value) => (value.id === id ? user : value));
    return this.users;
  }

  remove(id: number) {
    this.users = this.users.filter((value) => value.id != id);
    return this.users;
  }
}
