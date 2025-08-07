module.exports = {
name: ["xnxxdl","xvideosdl"],
param: "<url>",
cmd: ["xnxxdl","xvideosdl"],
category: "xpremiumx",
query: true,
url: true,
owner: true,
limit: true,
async handler(m, { ctx, q, command, args }) {
let xnxJson = await scraper.porn.xnxxdl(q)
let xjs = xnxJson.result
ctx.replyWithVideo({ url: xjs.files.high }, { duration: xjs.duration, thumbnail: { url: xjs.files.thumb }})
}}