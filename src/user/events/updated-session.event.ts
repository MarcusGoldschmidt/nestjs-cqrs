import {ApplicationEvent} from '../../common/cqrs/application.event';
import {HasChanged} from '../../common/cqrs/has-changed';

export class UpdatedSessionEvent extends ApplicationEvent {

    constructor(
        id: string,
        public readonly newRememberIp: HasChanged<string>,
        public readonly sessionId: HasChanged<string>,
    ) {
        super(id);
    }
}
