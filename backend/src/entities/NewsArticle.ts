import { Column, Entity, OneToMany, ManyToOne } from "typeorm";

import Base from "./Base";

@Entity()
class NewsArticle extends Base {
  @Column()
  sourceId: string;

  @Column()
  sourceName: string;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ unique: true })
  url: string;

  @Column()
  urlToImage: string;

  @Column()
  publishedAt: string;

  @Column()
  content: string;
}

export default NewsArticle;
