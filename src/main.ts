import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import ssr from '@react-ssr/nestjs-express/register';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import {ValidationPipe} from '@nestjs/common';
import {ApplicationLoggerService} from './logger/logger.service';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    await ssr(app);

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    app.useStaticAssets(join(__dirname, '..', 'public'));

    await app.listen(3000);
}

// tslint:disable-next-line:no-console
bootstrap().then(e => new ApplicationLoggerService().log('http://localhost:3000'));
