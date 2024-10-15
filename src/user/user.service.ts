import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './User.entity';
import { KafkaService } from './kafka.service';
import { UpdateUserDto } from 'src/validators/update-user.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    kafkaService: KafkaService;
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async create(Users: Partial<Users>): Promise<Users> {
        try{
            const newUsers = this.usersRepository.create(Users);
            this.logger.log(`Creating user: ${JSON.stringify(newUsers)}`);
            await KafkaService.prototype.sendMessage('users', { action: 'create', Users }); 
            return this.usersRepository.save(newUsers);
        } catch (error) {
            this.logger.error(`Failed to create user: ${error.message}`, error.stack);
            throw new BadRequestException('Error creating user');
        }
    }

    async findAll(): Promise<Users[]> {
        try {
            this.logger.log(`Retrieving all users`);
            return await this.usersRepository.find();
        } catch (error) {
            this.logger.error(`Failed to retrieve users: ${error.message}`, error.stack);
            throw new BadRequestException('Error retrieving users');
        }
    }

    async findOne(id: number): Promise<Users> {
        try {
            this.logger.log(`Retrieving user with id: ${id}`);
            const user = await this.usersRepository.findOneBy({ id });
            
            if (!user) {
                throw new NotFoundException(`User with id ${id} not found`);
            }

            return user;
        } catch (error) {
            this.logger.error(`Failed to retrieve user: ${error.message}`, error.stack);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Error retrieving user');
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
        try {
            this.logger.log(`Updating user with id: ${id} - ${JSON.stringify(updateUserDto)}`);
            const user = await this.findOne(id);

            await this.usersRepository.update(id, updateUserDto);
            
            await KafkaService.prototype.sendMessage('users', { action: 'update', user: updateUserDto });

            return this.findOne(id);
        } catch (error) {
            this.logger.error(`Failed to update user: ${error.message}`, error.stack);
            throw new BadRequestException('Error updating user');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            this.logger.log(`Deleting user with id: ${id}`);
            const user = await this.findOne(id);

            await this.usersRepository.delete(id);

            await KafkaService.prototype.sendMessage('users', { action: 'delete', user });

        } catch (error) {
            this.logger.error(`Failed to delete user: ${error.message}`, error.stack);
            throw new BadRequestException('Error deleting user');
        }
    }
}
