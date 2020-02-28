import {MigrationInterface, QueryRunner} from "typeorm";

export class SudokuBoardDiffucltyRename1582903694995 implements MigrationInterface {
    name = 'SudokuBoardDiffucltyRename1582903694995'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sudoku_board" RENAME COLUMN "difficulity" TO "difficulty"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sudoku_board" RENAME COLUMN "difficulty" TO "difficulity"`, undefined);
    }

}
