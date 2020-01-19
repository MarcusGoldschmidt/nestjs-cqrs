import {Module} from '@nestjs/common';
import {ErrorsHandlerService} from "./errors-handler.service";

@Module({
    imports: [],
    controllers: [],
    providers: [ErrorsHandlerService],
    exports: [ErrorsHandlerService]
})
export class ErrorsHandlerModule {
}
