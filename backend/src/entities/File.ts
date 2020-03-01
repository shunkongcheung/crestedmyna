import { Entity } from "typeorm";
import { getFileEntity } from "express-typescript-s3-starter";
import User from "./User";

const BaseFile = getFileEntity(User);

@Entity()
class File extends BaseFile {}

export default File;
