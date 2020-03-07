import {MigrationInterface, QueryRunner} from "typeorm";

export class NewsArticleInit1583546064618 implements MigrationInterface {
    name = 'NewsArticleInit1583546064618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_article" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "sourceId" character varying NOT NULL, "sourceName" character varying NOT NULL, "author" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "urlToImage" character varying NOT NULL, "publishedAt" TIMESTAMP NOT NULL, "createdById" integer, CONSTRAINT "UQ_c8124b9d4eefd9efeb340dd1b6a" UNIQUE ("url"), CONSTRAINT "PK_12e2ec4b5482dadc50ee88e0da1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "news_article" ADD CONSTRAINT "FK_f67c52eb49b925d5d6f23f2af65" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_article" DROP CONSTRAINT "FK_f67c52eb49b925d5d6f23f2af65"`, undefined);
        await queryRunner.query(`DROP TABLE "news_article"`, undefined);
    }

}
