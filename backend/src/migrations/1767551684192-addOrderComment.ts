import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderComment1767551684192 implements MigrationInterface {
    name = 'AddOrderComment1767551684192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` text NOT NULL, \`authorLastName\` varchar(255) NOT NULL, \`orderId\` bigint NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course\` enum ('FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` enum ('In work', 'New', 'Agree', 'Disagree', 'DUBBING') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_comments\` ADD CONSTRAINT \`FK_a296198dec9ee25dd4e3d3cacd2\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_comments\` DROP FOREIGN KEY \`FK_a296198dec9ee25dd4e3d3cacd2\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` enum ('In work', 'New', 'Agree', 'Disagree', 'DUBBING') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course\` enum ('FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course\` varchar(10) NULL`);
        await queryRunner.query(`DROP TABLE \`order_comments\``);
    }

}
