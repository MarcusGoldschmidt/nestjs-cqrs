import {ApplicationCommand} from '../../common/cqrs/application.command';
import 'reflect-metadata';

export default class CreateUserCommand extends ApplicationCommand {

    constructor(
        id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly confirmPassword: string,
    ) {
        super(id);
    }
}
