import {MigrationInterface, QueryRunner} from "typeorm";

export class ComicMasterInit1583293083128 implements MigrationInterface {
    name = 'ComicMasterInit1583293083128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comic_master" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "name" character varying NOT NULL, "shortName" character varying NOT NULL, "comicUrl" character varying NOT NULL, "type" character varying NOT NULL, "comicCoverUrl" character varying NOT NULL, "author" character varying NOT NULL, "createdById" integer, CONSTRAINT "PK_0c63b80f1315a004e4e59620207" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "comic_master" ADD CONSTRAINT "FK_e0734bab8d6f043e8bdfa1ea9ef" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_master" DROP CONSTRAINT "FK_e0734bab8d6f043e8bdfa1ea9ef"`, undefined);
        await queryRunner.query(`DROP TABLE "comic_master"`, undefined);
    }

}
