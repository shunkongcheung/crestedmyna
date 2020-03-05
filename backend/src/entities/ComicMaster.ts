import { Entity, Column } from "typeorm";
import Base from "./Base";

@Entity()
class ComicMaster extends Base {
  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column()
  comicUrl: string;

  @Column()
  type: string;

  @Column()
  comicCoverUrl: string;

  @Column()
  author: string;

  @Column({default: 1})
  page: number;
}

export default ComicMaster;
