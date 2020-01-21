import {Controller, Get, Param, Render, Res} from '@nestjs/common';

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

    @Get('public/images/:imagePath')
    sendImage(@Param() param, @Res() res) {
        return res.sendFile(param.imagePath, { root: 'public/images' });
    }
}
