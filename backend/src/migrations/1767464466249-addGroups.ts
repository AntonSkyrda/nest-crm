import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGroups1767464466249 implements MigrationInterface {
    name = 'AddGroups1767464466249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(15) NOT NULL, UNIQUE INDEX \`IDX_8a45300fd825918f3b40195fbd\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`groupId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a45300fd825918f3b40195fbd\` ON \`group\``);
        await queryRunner.query(`DROP TABLE \`group\``);
    }

}
