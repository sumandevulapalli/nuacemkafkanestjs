import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { Users } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() user: Partial<Users>) {
    return this.userService.create(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() user: Partial<Users>) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
