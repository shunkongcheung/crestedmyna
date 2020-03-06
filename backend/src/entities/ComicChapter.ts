import { Column, Entity, OneToMany, ManyToOne } from "typeorm";

import Base from "./Base";
import ComicMaster from "./ComicMaster";
import ComicPage from "./ComicPage";

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

  @OneToMany(
    () => ComicPage,
    comicPage => comicPage.comicChapter
  )
  comicPages: ComicChapter;
}

export default ComicChapter;
