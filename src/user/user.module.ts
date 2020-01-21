import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UpdateScoreHandler} from './commands/update-score.handler';
import {UserRepository} from './user.repository';
import {CqrsModule} from '@nestjs/cqrs';
import {UserEntity} from './user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApplicationLoggerModule} from '../logger/logger.module';
import {UserService} from './user.service';

export const CommandHandlers = [UpdateScoreHandler];
export const EventHandlers = [];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        CqrsModule,
        ApplicationLoggerModule,
    ],
    controllers: [UserController],
    providers: [
        UserRepository,
        UserService,
        ...CommandHandlers,
    ],
    exports: [
        UserService,
    ],
})
export class UserModule {
}
