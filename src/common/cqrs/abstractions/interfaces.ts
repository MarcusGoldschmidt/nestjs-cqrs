import {IsUUID} from "class-validator";

export class IApplicationCommand {
    id: number | string;
}

export class ApplicationEvent {
    @IsUUID()
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}
