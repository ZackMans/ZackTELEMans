module.exports = {
name: ["igdl","instagram"],
param: "<url>",
cmd: ["igdl","instagram"],
category: "media",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q, command }) {
await ctx.reply(response.wait)
require("../functions/autodl.js").igDL(q, ctx)
}}