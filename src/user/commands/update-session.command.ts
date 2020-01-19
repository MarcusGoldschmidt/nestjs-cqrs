import {ApplicationCommand} from '../../common/cqrs/application.command';
import {IsIP, IsNumberString} from 'class-validator';

export default class UpdateSessionCommand extends ApplicationCommand {

    constructor(id: number | string, newSessionId: string, newRememberIp: string) {
        super(id);
        this.newSessionId = newSessionId;
        this.newRememberIp = newRememberIp;
    }

    @IsNumberString()
    newSessionId: string;

    @IsIP()
    newRememberIp: string;
}
