import {Injectable} from '@nestjs/common';
import {UserEntity} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CommandBus} from '@nestjs/cqrs';
import UpdateSessionCommand from './commands/update-session.command';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly commandBus: CommandBus,
    ) {
    }

    async findByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.userRepository
            .createQueryBuilder()
            .where('email = :email', {email})
            .getOne();
    }

    async updateSessionAndIp(
        userId: string,
        newSessionId: string,
        newRememberIp: string): Promise<any> {
        await this.commandBus.execute(new UpdateSessionCommand(userId, newSessionId, newRememberIp));
    }
}
