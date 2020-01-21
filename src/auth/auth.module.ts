import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {UserModule} from '../user/user.module';
import {AuthService} from './auth.service';
import {ApplicationLoggerModule} from '../logger/logger.module';

@Module({
    imports: [
        UserModule,
        ApplicationLoggerModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
}
