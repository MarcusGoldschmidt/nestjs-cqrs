import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import Ssr = require('@react-ssr/nestjs-express/register');
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    await Ssr(app);

    app.useGlobalPipes(new ValidationPipe());

    app.useStaticAssets(join(__dirname, '..', 'public'));

    await app.listen(3000);
}

// tslint:disable-next-line:no-console
bootstrap().then(e => console.log('http://localhost:3000'));
