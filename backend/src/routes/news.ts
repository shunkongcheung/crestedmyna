import { Request } from "express";
import moment from "moment";
import { MoreThan } from "typeorm";

import getController from "../getController";
import { NewsArticle } from "../entities";

function filterEntities(
  model: typeof NewsArticle,
  paginateParams: { where?: Array<object> },
  req: Request
) {
  if (Array.isArray(paginateParams.where))
    (paginateParams.where[0] as { [x: string]: any }).publishedAt = new Date();
  else
    paginateParams.where = [{ publishedAt: MoreThan(moment().startOf("day")) }];

  return model.find(paginateParams);
}

const controller = getController({
  allowedMethods: ["list"],
  authenticated: false,
  filterEntities,
  model: NewsArticle
});

export default controller;
