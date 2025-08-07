module.exports = {
name: ["twdl","twitter"],
param: "<url>",
cmd: ["twdl","twitter"],
category: "media",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q, command }) {
await ctx.reply(response.wait)
require("../functions/autodl.js").twDL(q, ctx)
}}