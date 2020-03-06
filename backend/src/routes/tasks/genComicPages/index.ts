import Crawler from "crawler";
import { body } from "express-validator";
import { getConnection } from "typeorm";

import isAdminMiddleware from "../isAdminMiddleware";
import getController from "../../../getController";
import { ComicChapter } from "../../../entities";

import getArgFromHtml from "./getArgFromHtml";

const validations = [body("comicChapter").isNumeric(), isAdminMiddleware];

async function fetchCrawler(url: string): Promise<any> {
  return new Promise(function(resolve: any, reject: any) {
    const comicCrawler = new Crawler({
      maxConnections: 10,
      callback: function(error: any, res: any, done: any) {
        if (error) reject(error);
        else resolve(res);
        done();
      }
    });
    comicCrawler.queue(url);
  });
}

async function genComicChapters(comicChapterId: number) {
  const connection = getConnection();
  const comicChapters = await connection.getRepository(ComicChapter).find({
    where: [{ id: comicChapterId }],
    relations: ["comicPages"]
  });
  if (!Array.isArray(comicChapters) || !comicChapters.length)
    throw Error(`Invalid comic chapter id ${comicChapterId}`);

  const comicChapter = comicChapters[0];
  const { chapterUrl } = comicChapter;

  const res = await fetchCrawler(`https://manhua.dmzj.com/${chapterUrl}`);
  // const data =
  getArgFromHtml(res.body);

  // bulkCreateOrUpdate(comicMaster, data);

  return res.body;
}

const controller = getController({
  model: ComicChapter,
  allowedMethods: ["create"],
  validations: { create: validations } as any,
  transformCreateData: async (data: { comicChapter: number }) => {
    const ret = await genComicChapters(data.comicChapter);
    return [null, ret];
  }
});

export default controller;
