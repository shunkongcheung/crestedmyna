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

export default getArgFromHtml;
