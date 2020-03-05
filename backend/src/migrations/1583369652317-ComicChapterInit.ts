import {MigrationInterface, QueryRunner} from "typeorm";

export class ComicChapterInit1583369652317 implements MigrationInterface {
    name = 'ComicChapterInit1583369652317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comic_chapter" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "title" character varying NOT NULL, "chapterUrl" character varying NOT NULL, "createdById" integer, "comicMasterId" integer, CONSTRAINT "PK_22170172fe2dcf549958f093fe1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_chapter" ADD CONSTRAINT "FK_228da1db45c3f11fbd8860f2316" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_chapter" ADD CONSTRAINT "FK_69b539d7f439a8d0a34033c452a" FOREIGN KEY ("comicMasterId") REFERENCES "comic_master"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_chapter" DROP CONSTRAINT "FK_69b539d7f439a8d0a34033c452a"`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_chapter" DROP CONSTRAINT "FK_228da1db45c3f11fbd8860f2316"`, undefined);
        await queryRunner.query(`DROP TABLE "comic_chapter"`, undefined);
    }

}
