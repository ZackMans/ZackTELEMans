module.exports = {
name: ["aiovideodl","aio"],
param: "<url>",
cmd: ["aiovideodl","aiovdl","aio"],
category: "media",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q }) {
await ctx.reply(response.wait)
require("../functions/autodl.js").aiovDL(q, ctx)
}}