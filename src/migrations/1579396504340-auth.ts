import {MigrationInterface, QueryRunner} from "typeorm";

export class auth1579396504340 implements MigrationInterface {
    name = 'auth1579396504340';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `User` ADD `email` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `User` ADD UNIQUE INDEX `IDX_4a257d2c9837248d70640b3e36` (`email`)", undefined);
        await queryRunner.query("ALTER TABLE `User` ADD `password` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `User` ADD `permission` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `User` ADD `verified` tinyint NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `User` ADD `rememberToken` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `User` ADD `rememberIp` varchar(36) NOT NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_USER_EMAIL_UNIQUE` ON `User` (`email`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_USER_EMAIL_UNIQUE` ON `User`", undefined);
        await queryRunner.query("ALTER TABLE `User` DROP COLUMN `rememberIp`", undefined);
        await queryRunner.query("ALTER TABLE `User` DROP COLUMN `rememberToken`", undefined);
        await queryRunner.query("ALTER TABLE `User` DROP COLUMN `verified`", undefined);
        await queryRunner.query("ALTER TABLE `User` DROP COLUMN `permission`", undefined);
        await queryRunner.query("ALTER TABLE `User` DROP COLUMN `password`", undefined);
        await queryRunner.query("ALTER TABLE `User` DROP INDEX `IDX_4a257d2c9837248d70640b3e36`", undefined);
        await queryRunner.query("ALTER TABLE `User` DROP COLUMN `email`", undefined);
    }

}
