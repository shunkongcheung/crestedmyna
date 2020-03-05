import { Column, Entity, ManyToOne } from "typeorm";
import Base from "./Base";
import ComicMaster from "./ComicMaster";

@Entity()
class ComicChapter extends Base {
  @Column()
  title: string;

  @Column()
  chapterUrl: string;

  @Column()
  @ManyToOne(() => ComicChapter)
  comicMaster: ComicChapter;
}

export default ComicChapter;
