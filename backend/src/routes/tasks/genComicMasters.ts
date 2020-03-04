import { body } from "express-validator";
import nodeFetch from "node-fetch";
import { getConnection } from "typeorm";

import isAdminMiddleware from "./isAdminMiddleware";
import getController from "../../getController";
import { ComicMaster } from "../../entities";

interface ComicMasterRetItem {
  name: string;
  short_name: string;
  comic_url: string;
  type: string;
  last_update_date: string;
  comic_cover: string;
  author: string;
}

const validations = [
  body("page")
    .isNumeric()
    .optional(),
  isAdminMiddleware
];

async function fetchComicMasters(
  page: number
): Promise<Array<ComicMasterRetItem>> {
  const url = `https://sacg.dmzj.com/mh/index.php?c=category&m=doSearch&status=0&reader_group=0&zone=0&initial=all&type=0&p=${page}&callback=NN`;
  const res = await nodeFetch(url);
  const text = await res.text();
  let parsedText = text.replace(`NN(`, "");
  parsedText = parsedText.replace(");", "");
  const data = JSON.parse(parsedText);
  if (data.status !== "OK") {
    throw Error(`Invalid page ${page}`);
  }
  return data.result;
}

async function genComicMasters(page?: number) {
  if (page) {
    const entityOnPage = await ComicMaster.findOne({ page });
    if (!!entityOnPage) {
      throw Error(`Page ${page} was already fetched. Exit without working`);
    }
  } else {
    const lastEntity = await ComicMaster.find({
      take: 1,
      order: { page: "DESC" }
    });
    page = lastEntity.length ? lastEntity[0].page + 1 : 1;
    console.log(`No page was specified. Going to fetch from page ${page}.`);
  }

  const comicMasters = await fetchComicMasters(page);
  const values = comicMasters.map((itm: ComicMasterRetItem) => ({
    name: itm.name || "",
    shortName: itm.short_name || "",
    comicUrl: itm.comic_url || "",
    type: itm.type || "",
    lastUpdateDate: itm.last_update_date || "",
    comicCoverUrl: itm.comic_cover || "",
    author: itm.author || "",
    page
  }));
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(ComicMaster)
    .values(values)
    .execute();

  return { page, createdCount: values.length };
}

const controller = getController({
  model: ComicMaster,
  allowedMethods: ["create"],
  validations: { create: validations } as any,
  transformCreateData: async (data: { page?: number }) => {
    const ret = await genComicMasters(data.page);
    return [null, ret];
  }
});

export default controller;