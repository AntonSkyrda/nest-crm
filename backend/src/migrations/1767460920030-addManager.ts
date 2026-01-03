import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManager1767460920030 implements MigrationInterface {
    name = 'AddManager1767460920030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`managerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_3f30dcd69f06f473c7bb510d11c\` FOREIGN KEY (\`managerId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_3f30dcd69f06f473c7bb510d11c\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`managerId\``);
    }

}
