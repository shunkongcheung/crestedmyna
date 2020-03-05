import {MigrationInterface, QueryRunner} from "typeorm";

export class ComicMasterAddPage1583294212599 implements MigrationInterface {
    name = 'ComicMasterAddPage1583294212599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_master" ADD "page" integer NOT NULL DEFAULT 1`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_master" DROP COLUMN "page"`, undefined);
    }

}
