import {MigrationInterface, QueryRunner} from "typeorm";

export class SudokuBoardInit1582842580307 implements MigrationInterface {
    name = 'SudokuBoardInit1582842580307'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "sudoku_board" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "startBoard" character varying(81) NOT NULL DEFAULT '_________________________________________________________________________________', "solutionBoard" character varying(81) NOT NULL DEFAULT '_________________________________________________________________________________', "currentBoard" character varying(81) NOT NULL DEFAULT '_________________________________________________________________________________', "usedSecond" integer NOT NULL DEFAULT 0, "difficulity" character varying NOT NULL, "createdById" integer, CONSTRAINT "PK_a886f23fbfcfbde60c35d56067b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "sudoku_board" ADD CONSTRAINT "FK_eb3a5cacc99bb508f27c645988c" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sudoku_board" DROP CONSTRAINT "FK_eb3a5cacc99bb508f27c645988c"`, undefined);
        await queryRunner.query(`DROP TABLE "sudoku_board"`, undefined);
    }

}
