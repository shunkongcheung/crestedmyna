import { body } from "express-validator";
import moment from "moment";
import nodeFetch from "node-fetch";
import { getConnection } from "typeorm";
import uuid from "uuid";

import isAdminMiddleware from "./isAdminMiddleware";
import { NewsArticle } from "../../entities";
import getController from "../../getController";

interface ArticleFromApi {
  source: {
    id?: string;
    name?: string;
  };
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
}

const validations = [isAdminMiddleware];

async function fetchNewsFromApi() {
  const res = await nodeFetch(
    `http://newsapi.org/v2/top-headlines?country=hk&apiKey=${process.env.NEWS_API_KEY}`
  );
  const { articles } = await res.json();
  return articles.map((article: ArticleFromApi) => ({
    sourceId: article.source.id || "",
    sourceName: article.source.name || "",
    author: article.author || "",
    title: article.title || "",
    description: article.description || "",
    url: article.url || uuid.v4(),
    urlToImage: article.urlToImage || "",
    publishedAt: moment(article.publishedAt)
  }));
}

async function genNewsArticles() {
  const results = await fetchNewsFromApi();
  getConnection()
    .createQueryBuilder()
    .insert()
    .into(NewsArticle)
    .values(results)
    .onConflict(`("url") DO NOTHING`)
    .execute();
  return [null, results];
}

const controller = getController({
  model: NewsArticle,
  allowedMethods: ["create"],
  validations: { create: validations } as any,
  transformCreateData: genNewsArticles
});

export default controller;
