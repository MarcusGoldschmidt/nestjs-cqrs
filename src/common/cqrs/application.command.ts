import {IsUUID} from 'class-validator';

export abstract class ApplicationCommand {

    protected constructor(id: number | string) {
        this.id = id;
    }

    id: number | string;
}
