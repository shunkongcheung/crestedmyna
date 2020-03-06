import {MigrationInterface, QueryRunner} from "typeorm";

export class ComicPageAddCompositeKey1583466222515 implements MigrationInterface {
    name = 'ComicPageAddCompositeKey1583466222515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_page" ADD "comicChapterAndPage" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_page" ADD CONSTRAINT "UQ_d5fab0890bcd5980cff16992891" UNIQUE ("comicChapterAndPage")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_page" DROP CONSTRAINT "UQ_d5fab0890bcd5980cff16992891"`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_page" DROP COLUMN "comicChapterAndPage"`, undefined);
    }

}
