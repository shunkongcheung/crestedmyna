import { Column, Entity } from "typeorm";
import { BaseUser } from "express-typescript-s3-starter";

@Entity()
class User extends BaseUser {
  @Column({ default: "" })
  firstName: string;

  @Column({ default: "" })
  lastName: string;
}

export default User;
