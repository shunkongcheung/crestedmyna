import {MigrationInterface, QueryRunner} from "typeorm";

export class SudokuAddCompleted1583057319414 implements MigrationInterface {
    name = 'SudokuAddCompleted1583057319414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sudoku_board" ADD "completed" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sudoku_board" DROP COLUMN "completed"`, undefined);
    }

}
