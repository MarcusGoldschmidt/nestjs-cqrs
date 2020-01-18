import {Body, Controller, Post, Render} from '@nestjs/common';
import UpdateScoreCommand from "./commands/update-score.command";
import {CommandBus} from "@nestjs/cqrs";

@Controller('user')
export class UserController {

    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    @Render('index')
    async getHello(@Body() command: UpdateScoreCommand): Promise<string> {
        await this.commandBus.execute(command);
        return '';
    }
}
