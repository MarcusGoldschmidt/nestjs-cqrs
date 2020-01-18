import {MigrationInterface, QueryRunner} from "typeorm";

export class fist1579382366485 implements MigrationInterface {
    name = 'fist1579382366485';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `User` (`id` varchar(36) NOT NULL, `createdAt` datetime NOT NULL, `updateAt` datetime NOT NULL, `name` varchar(255) NOT NULL, `score` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `User`", undefined);
    }

}
