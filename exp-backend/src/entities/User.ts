import { Column, Entity } from "typeorm";
import { BaseUser } from "shunkongcheung-express-starter";

@Entity()
class User extends BaseUser {
  @Column({ default: "" })
  firstName: string;

  @Column({ default: "" })
  lastName: string;
}

export default User;
