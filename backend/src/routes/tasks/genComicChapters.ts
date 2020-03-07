import Crawler from "crawler";
import cheerio from "cheerio";
import { body } from "express-validator";
import { getConnection } from "typeorm";

import isAdminMiddleware from "./isAdminMiddleware";
import getController from "../../getController";
import { ComicChapter, ComicMaster } from "../../entities";

interface ComicChapterItem {
  title: string;
  chapterUrl: string;
}

const validations = [body("comicMaster").isNumeric(), isAdminMiddleware];

async function bulkCreateOrUpdate(
  comicMaster: ComicMaster,
  data: Array<ComicChapterItem>
) {
  const datas = [];
  for (const dataItem of data) {
    const dataToStore = {
      title: dataItem.title || "",
      chapterUrl: dataItem.chapterUrl || "",
      comicMaster
    };

    datas.push(dataToStore);
  }
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(ComicChapter)
    .values(datas)
    .onConflict(`("chapterUrl") DO NOTHING`)
    .execute();

  console.log(
    `Finish inserting ${data.length} chapter(s) for comic master ${comicMaster.name}(${comicMaster.id}).`
  );
}

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

function getDataFromHtml(htmlFile: string): Array<ComicChapterItem> {
  const $ = cheerio.load(htmlFile);
  const data: Array<ComicChapterItem> = [];
  $(".cartoon_online_border ul li a").each((_: any, itm) => {
    data.push({
      chapterUrl: itm.attribs["href"],
      title: itm.attribs["title"]
    });
  });
  return data;
}

async function genComicChapters(comicMasterId: number) {
  const connection = getConnection();
  const comicMasters = await connection.getRepository(ComicMaster).find({
    where: [{ id: comicMasterId }],
    relations: ["comicChapters"]
  });
  if (!Array.isArray(comicMasters) || !comicMasters.length)
    throw Error(`Invalid comic master id ${comicMasterId}`);

  const comicMaster = comicMasters[0];
  const { comicUrl } = comicMaster;

  const res = await fetchCrawler(`https://manhua.dmzj.com${comicUrl}`);
  const data = getDataFromHtml(res.body);

  bulkCreateOrUpdate(comicMaster, data);

  return data;
}

const controller = getController({
  model: ComicChapter,
  allowedMethods: ["create"],
  validations: { create: validations } as any,
  transformCreateData: async (data: { comicMaster: number }) => {
    const ret = await genComicChapters(data.comicMaster);
    return [null, ret];
  }
});

export default controller;
