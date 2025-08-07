module.exports = {
name: ["xnxxsearch","xnxxs"],
param: "<query>",
cmd: ["xnxxsearch","xnxxs"],
category: "xpremiumx",
query: true,
owner: true,
limit: true,
async handler(m, { ctx, q, command, args }) {
let xnxJson = await scraper.porn.xnxxsearch(q)
let xjs = xnxJson.result
var xntex = ""
for (let i = 0; i < xjs.length; i++) {
xntex = `- Title : ${xjs[i].title}\n - Link : ${xjs[i].link}`
ctx.reply(xntex)
}
}}