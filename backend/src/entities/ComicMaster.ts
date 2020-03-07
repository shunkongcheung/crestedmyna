import { Entity, Column, OneToMany } from "typeorm";
import Base from "./Base";
import ComicChapter from "./ComicChapter";

@Entity()
class ComicMaster extends Base {
  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column({ unique: true })
  comicUrl: string;

  @Column()
  type: string;

  @Column()
  comicCoverUrl: string;

  @Column()
  author: string;

  @Column({ default: 1 })
  page: number;

  @OneToMany(
    () => ComicChapter,
    comicChapter => comicChapter.comicMaster
  )
  comicChapters: ComicChapter;
}

export default ComicMaster;
