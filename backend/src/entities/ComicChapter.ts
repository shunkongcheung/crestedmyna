import { Column, Entity, ManyToOne } from "typeorm";
import Base from "./Base";
import ComicMaster from "./ComicMaster";

@Entity()
class ComicChapter extends Base {
  @Column()
  title: string;

  @Column({ unique: true })
  chapterUrl: string;

  @ManyToOne(
    () => ComicMaster,
    comicMaster => comicMaster.comicChapters
  )
  comicMaster: ComicChapter;
}

export default ComicChapter;
