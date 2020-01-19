import {ApplicationEvent} from "../../common/cqrs/interfaces";

export class CreatedUserEvent extends ApplicationEvent {

    constructor(
        id: string,
        private readonly name: string,
        private readonly email: string,
        private readonly createdAt: Date,
        private readonly connectedIp: string) {
        super(id);
    }
}
