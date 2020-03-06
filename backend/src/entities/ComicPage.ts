import { Entity, Column, ManyToOne } from "typeorm";
import Base from "./Base";
import ComicMaster from "./ComicMaster";
import ComicChapter from "./ComicChapter";

@Entity()
class ComicPage extends Base {
  @Column({ default: 1 })
  page: number;

  @Column()
  s3Key: string;

  @ManyToOne(
    () => ComicChapter,
    (comicChapter: ComicChapter) => comicChapter.comicMaster
  )
  comicChapter: ComicChapter;

  @ManyToOne(() => ComicMaster)
  comicMaster: ComicMaster;
}

export default ComicPage;
