import handlerMixin from "./handlerMixin";

function triggerGenComicMasters() {
  return handlerMixin("gen-news-articles", {});
}

export const handler = triggerGenComicMasters;
