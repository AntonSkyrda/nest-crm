import { MigrationInterface, QueryRunner } from "typeorm";

export class ChengeVarcharFields1767570278929 implements MigrationInterface {
    name = 'ChengeVarcharFields1767570278929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course_format\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course_format\` enum ('static', 'online') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course_type\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course_type\` enum ('pro', 'minimal', 'premium', 'incubator', 'vip') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course_type\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course_type\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course_format\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course_format\` varchar(15) NULL`);
    }

}
