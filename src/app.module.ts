import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
