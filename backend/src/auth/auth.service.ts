import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string) {
    const user = await this.usersService.findOneByUsername(username);
    const payload = { username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(dto: SignUpDto) {
    const userEmail = await this.usersService.findOneByEmail(dto.email);
    const userNickname = await this.usersService.findOneByUsername(
      dto.username,
    );
    if (userEmail) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    if (userNickname) {
      throw new BadRequestException(
        'Пользователь с таким nickname уже существует',
      );
    }

    const salt = await genSalt(8);
    const hashPassword = await hash(dto.password, salt);
    const { id, username, about, avatar, email, createdAt, updatedAt } =
      await this.usersService.create({
        ...dto,
        password: hashPassword,
      });
    return { id, username, about, avatar, email, createdAt, updatedAt };
  }

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) return null;
    const isMatch = await compare(pass, user.password);
    if (!isMatch) return null;
    delete user.password;
    return user;
  }
}
