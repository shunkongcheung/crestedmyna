import AWS from "aws-sdk";
import Crawler from "crawler";
import { body } from "express-validator";
import { getConnection } from "typeorm";
import uuid from "uuid";
import moment from "moment";

import isAdminMiddleware from "../isAdminMiddleware";
import getController from "../../../getController";
import { ComicChapter, ComicPage } from "../../../entities";

import decode from "./decode";

const validations = [body("comicChapter").isNumeric(), isAdminMiddleware];

async function bulkCreateOrUpdate(
  comicChapter: ComicChapter,
  imageUrls: Array<string>,
  s3Keys: Array<string>
) {
  const { id: chapterId, comicMaster } = comicChapter;
  const datas = [];
  for (let idx = 0; idx < s3Keys.length; idx++) {
    const s3Key = s3Keys[idx];
    const page = idx;
    const comicChapterAndPage = `${chapterId}-${page}`;
    datas.push({ page, s3Key, comicChapter, comicMaster, comicChapterAndPage });
  }

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(ComicPage)
    .values(datas)
    .onConflict(`("comicChapterAndPage") DO NOTHING`)
    .execute();

  const dataLen = imageUrls.length;
  const comicName = comicMaster.name;
  const comicId = comicMaster.id;
  const chapterName = comicChapter.title;

  console.log(
    `Finish inserting ${dataLen} pages(s) for comic master ${comicName}(${comicId}) chapter ${chapterName}(${chapterId}). `
  );
}

async function fetchCrawler(url: string, config = {}): Promise<any> {
  return new Promise(function(resolve: any, reject: any) {
    const comicCrawler = new Crawler({
      ...config,
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

function getArgFromHtml(htmlBody: string) {
  const args = htmlBody.split("p}(")[1].split(",{}))")[0];
  const firstArg = `${args.split(`';'`)[0]}';'`;
  const restArgs = args.split(`';'`)[1].split(",");
  const secondArg = Number(restArgs[1]);
  const thirdArg = Number(restArgs[2]);
  const forthArg = restArgs[3].split(`'.split('|')`)[0].split("|");
  const fifthArg = Number(restArgs[4]);
  return [firstArg, secondArg, thirdArg, forthArg, fifthArg, {}];
}

async function genComicChapters(comicChapterId: number) {
  const connection = getConnection();
  const comicChapters = await connection.getRepository(ComicChapter).find({
    where: [{ id: comicChapterId }],
    relations: ["comicPages", "comicMaster"]
  });
  if (!Array.isArray(comicChapters) || !comicChapters.length)
    throw Error(`Invalid comic chapter id ${comicChapterId}`);

  const comicChapter = comicChapters[0];
  const { chapterUrl: pathname } = comicChapter;

  const chapterUrl = `https://manhua.dmzj.com/${pathname}`;
  const res = await fetchCrawler(chapterUrl);
  const args = getArgFromHtml(res.body);
  const pageUrls = decode(args[0], args[1], args[2], args[3], args[4], args[5]);
  storeToS3AndDb(chapterUrl, comicChapter, pageUrls.slice(0, 5));

  return pageUrls;
}

function getS3() {
  const BUCKET_NAME = process.env.S3_BUCKET_NAME;
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_SECRET_KEY
  });
  const s3 = new AWS.S3();
  const ret: [AWS.S3, string] = [s3, BUCKET_NAME];
  return ret;
}

function getTime() {
  return moment().format("mm:ss");
}

async function storeToS3AndDb(
  chapterUrl: string,
  comicChapter: ComicChapter,
  pageUrls: Array<string>
) {
  const [s3, Bucket] = getS3();

  const pageImages = await Promise.all(
    pageUrls.map(async (pageUrl: string) => {
      const { body } = await fetchCrawler(
        `https://images.dmzj.com/${pageUrl}`,
        { encoding: null, referer: chapterUrl, jQuery: false }
      );
      return body;
    })
  );

  console.log(`${getTime()} after fetching images`);

  const s3Keys = await Promise.all(
    pageImages.map(async (pageImage: Buffer) => {
      const params = { Bucket, Key: `${uuid.v4()}.jpg`, Body: pageImage };
      const data = await s3.upload(params).promise();
      const { Key: s3Key } = data;
      return s3Key;
    })
  );
  console.log(`${getTime()} after fetching s3`);

  await bulkCreateOrUpdate(comicChapter, pageUrls, s3Keys);
  console.log(`${getTime()} after database storage`);
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
