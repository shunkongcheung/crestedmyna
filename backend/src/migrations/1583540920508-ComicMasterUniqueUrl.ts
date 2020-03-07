import {MigrationInterface, QueryRunner} from "typeorm";

export class ComicMasterUniqueUrl1583540920508 implements MigrationInterface {
    name = 'ComicMasterUniqueUrl1583540920508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_master" ADD CONSTRAINT "UQ_a7f0c53eef8122b67c6a41af4b5" UNIQUE ("comicUrl")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_master" DROP CONSTRAINT "UQ_a7f0c53eef8122b67c6a41af4b5"`, undefined);
    }

}
