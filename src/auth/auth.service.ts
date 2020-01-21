import {Injectable} from '@nestjs/common';
import {UserEntity} from '../user/user.entity';
import {UserService} from '../user/user.service';
import * as Crypt from 'bcrypt';
import {ApplicationLoggerService} from '../logger/logger.service';
import {AuthException} from '../common/exceptions/auth.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly logger: ApplicationLoggerService,
    ) {
    }

    async validate(email: string, password: string): Promise<UserEntity | undefined> {
        const user = await this.userService.findByEmail(email);

        if (user && await Crypt.compare(password, user.password)) {
            this.logger.log(`${user.name} has right local passport`);
            return user;
        }
        this.logger.log(`${email} do not have right local passport`);
        return undefined;
    }

    async loginUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.validate(email, password);

        if (!user) {
            throw new AuthException();
        }

        return user;
    }
}
