import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { KafkaService } from './kafka.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService,KafkaService],
  controllers: [UserController],
  exports: [UsersService], 
})
export class UserModule {}
