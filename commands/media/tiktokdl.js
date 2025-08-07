module.exports = {
name: ["ttdl","tiktok"],
param: "<url>",
cmd: ["ttdl","tiktok"],
category: "media",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q, command }) {
await ctx.reply(response.wait)
require("../functions/autodl.js").ttDL(q, ctx)
}}