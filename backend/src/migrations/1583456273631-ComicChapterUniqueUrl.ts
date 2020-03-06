import {MigrationInterface, QueryRunner} from "typeorm";

export class ComicChapterUniqueUrl1583456273631 implements MigrationInterface {
    name = 'ComicChapterUniqueUrl1583456273631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_chapter" ADD CONSTRAINT "UQ_676d809ac71d9d6cbf17af9ad8d" UNIQUE ("chapterUrl")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_chapter" DROP CONSTRAINT "UQ_676d809ac71d9d6cbf17af9ad8d"`, undefined);
    }

}
