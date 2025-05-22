import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  profile(@User('id') id: number) {
    return this.usersService.profile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateProfile(@Body() dto: UpdateUserDto, @User('id') id: number) {
    return this.usersService.updateProfile(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  getOwnWishes(@User('id') userId: number) {
    return this.usersService.getWishesById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  getAnotherUserWishes(@Param('username') username: string) {
    return this.usersService.getWishesByNickname(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  getAnotherUser(@Param('username') username: string) {
    return this.usersService.getAnotherUser(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  findMany(@Body() { query }: FindUserDto) {
    return this.usersService.findUser(query);
  }
}
