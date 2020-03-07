import {MigrationInterface, QueryRunner} from "typeorm";

export class ComicPageInit1583453409868 implements MigrationInterface {
    name = 'ComicPageInit1583453409868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comic_page" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "page" integer NOT NULL DEFAULT 1, "createdById" integer, "comicChapterId" integer, "comicMasterId" integer, CONSTRAINT "PK_c8084d51da67ef81c9fcb64b2b1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_page" ADD CONSTRAINT "FK_aa9ec51fa5f81360bf98009e341" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_page" ADD CONSTRAINT "FK_8b13a03b5c208330699ec9a7d04" FOREIGN KEY ("comicChapterId") REFERENCES "comic_chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_page" ADD CONSTRAINT "FK_677ca2cb5e71880baf0673b0ebe" FOREIGN KEY ("comicMasterId") REFERENCES "comic_master"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_page" DROP CONSTRAINT "FK_677ca2cb5e71880baf0673b0ebe"`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_page" DROP CONSTRAINT "FK_8b13a03b5c208330699ec9a7d04"`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_page" DROP CONSTRAINT "FK_aa9ec51fa5f81360bf98009e341"`, undefined);
        await queryRunner.query(`DROP TABLE "comic_page"`, undefined);
    }

}
