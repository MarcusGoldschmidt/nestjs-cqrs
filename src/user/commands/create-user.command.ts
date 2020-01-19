import {ApplicationCommand} from '../../common/cqrs/application.command';
import 'reflect-metadata';

export default class CreateUserCommand extends ApplicationCommand {

    name: string;

    email: string;

    password: string;

    confirmPassword: string;
}
