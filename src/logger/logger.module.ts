import {Module} from '@nestjs/common';
import {ApplicationLoggerService} from "./logger.service";

@Module({
    imports: [],
    controllers: [],
    providers: [ApplicationLoggerService],
    exports: [ApplicationLoggerService]
})
export class ApplicationLoggerModule {
}
