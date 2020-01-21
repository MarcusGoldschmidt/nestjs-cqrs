import {Injectable, Scope} from '@nestjs/common';
import {ApplicationError} from '../common/cqrs/error';

@Injectable({
    scope: Scope.REQUEST,
})
export class ErrorsHandlerService {
    private readonly error: ApplicationError[] = [];

    add(error: ApplicationError) {
        this.error.push(error);
    }

    hasError(): boolean {
        return this.error.length > 0;
    }

    getAll(): Readonly<ApplicationError[]> {
        return this.error;
    }
}
