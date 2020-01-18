import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import Ssr = require('@react-ssr/nestjs-express/register');
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import {ValidationPipe} from '@nestjs/common';
import {LoggerService} from "./logger/logger.service";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    await Ssr(app);

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    app.useStaticAssets(join(__dirname, '..', 'public'));

    await app.listen(3000);
}

// tslint:disable-next-line:no-console
bootstrap().then(e => new LoggerService().log('http://localhost:3000'));
