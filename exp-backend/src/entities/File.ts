import { Entity } from "typeorm";
import { getFileEntity } from "shunkongcheung-express-starter";
import User from "./User";

const BaseFile = getFileEntity(User);

@Entity()
class File extends BaseFile {}

export default File;
