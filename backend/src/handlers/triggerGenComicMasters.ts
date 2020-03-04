import handlerMixin from "./handlerMixin";

function triggerGenComicMasters() {
  return handlerMixin("gen-comic-masters", {});
}

export const handler = triggerGenComicMasters;
