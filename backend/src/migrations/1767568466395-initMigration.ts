import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1767568466395 implements MigrationInterface {
    name = 'InitMigration1767568466395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`managerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`groupId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course\` enum ('FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` enum ('In work', 'New', 'Agree', 'Disagree', 'DUBBING') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_3f30dcd69f06f473c7bb510d11c\` FOREIGN KEY (\`managerId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_3f30dcd69f06f473c7bb510d11c\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`managerId\``);
    }

}
