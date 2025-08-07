module.exports = {
name: ["fbdl","facebook"],
param: "<url>",
cmd: ["fbdl","facebook"],
category: "media",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q, command }) {
await ctx.reply(response.wait)
require("../functions/autodl.js").fbDL(q, ctx)
}}