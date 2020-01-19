import {IApplicationCommand} from "../../common/cqrs/interfaces";
import 'reflect-metadata';

export default class CreateUserCommand extends IApplicationCommand {

    name: string;

    email: string;

    password: string;

    confirmPassword: string;
}
