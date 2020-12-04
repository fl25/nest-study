import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}

export class UpdateUserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}

export class LoginUserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
