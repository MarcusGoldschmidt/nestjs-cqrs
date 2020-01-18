import {Controller, Get, Render} from '@nestjs/common';

export interface GetHelloView {
    nome: string;
    count: number;
}

@Controller()
export class AppController {

    @Get()
    @Render('index')
    getHello(): GetHelloView {

        return {
            nome: 'Marcus Goldschmidt Oliveira',
            count: 0,
        };
    }
}
