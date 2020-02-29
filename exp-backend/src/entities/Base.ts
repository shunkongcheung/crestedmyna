import { getBaseEntity } from "express-typescript-s3-starter";
import User from "./User";

const Base = getBaseEntity(User);

export default Base;
