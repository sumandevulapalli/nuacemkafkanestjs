import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './User.entity';
import { KafkaService } from './kafka.service';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    kafkaService: KafkaService;
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async create(Users: Partial<Users>): Promise<Users> {
        const newUsers = this.usersRepository.create(Users);
        this.logger.log(`Creating user: ${JSON.stringify(newUsers)}`);
        await KafkaService.prototype.sendMessage('users', { action: 'create', Users }); 
        return this.usersRepository.save(newUsers);
    }

    findAll(): Promise<Users[]> {
        this.logger.log(`Retriving all users`);
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<Users> {
        this.logger.log(`Retrieving user with id: ${id}`);
        return this.usersRepository.findOneBy({ id });
    }

    async update(id: number, Users: Partial<Users>): Promise<Users> {
        this.logger.log(`Updating user with id: ${id} - ${JSON.stringify(Users)}`);
        await this.usersRepository.update(id, Users);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
