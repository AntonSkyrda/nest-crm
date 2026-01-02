import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderTable1767370011562 implements MigrationInterface {
    name = 'AddOrderTable1767370011562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(25) NULL, \`surname\` varchar(25) NULL, \`email\` varchar(100) NULL, \`phone\` varchar(12) NULL, \`age\` int NULL, \`course\` varchar(10) NULL, \`course_format\` varchar(15) NULL, \`course_type\` varchar(100) NULL, \`sum\` int NULL, \`alreadyPaid\` int NULL, \`created_at\` datetime(6) NULL, \`utm\` varchar(100) NULL, \`msg\` varchar(100) NULL, \`status\` varchar(15) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
