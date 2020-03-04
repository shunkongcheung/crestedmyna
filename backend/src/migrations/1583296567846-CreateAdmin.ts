import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities";

export class CreateAdmin1583296567846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepo = queryRunner.connection.getRepository(User);

    await userRepo.insert([
      {
        username: "admin",
        firstName: "Admin",
        lastName: "Admin",
        password: "irrelevant"
      }
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
