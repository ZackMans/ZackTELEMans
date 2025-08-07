module.exports = {
name: ["xvideossearch","xvideoss"],
param: "<query>",
cmd: ["xvideossearch","xvideoss"],
category: "xpremiumx",
query: true,
owner: true,
limit: true,
async handler(m, { ctx, q, command, args }) {
let xvsJson = await scraper.porn.xvideossearch(q)
let xvjs = xvsJson.result
var xvtex = ""
for (let i = 0; i < xvjs.length; i++) {
xvtex = `- Title : ${xvjs[i].title}\n - Link : ${xvjs[i].link}`
ctx.reply(xvtex)
}
}}