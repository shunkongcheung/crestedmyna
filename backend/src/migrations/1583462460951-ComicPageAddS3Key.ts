import {MigrationInterface, QueryRunner} from "typeorm";

export class ComicPageAddS3Key1583462460951 implements MigrationInterface {
    name = 'ComicPageAddS3Key1583462460951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_page" ADD "s3Key" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_page" DROP COLUMN "s3Key"`, undefined);
    }

}
