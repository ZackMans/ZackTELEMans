module.exports = {
name: ["bingimg"],
param: "<query>",
cmd: ["bingimg"],
category: "media",
query: true,
limit: true,
async handler(m, { ctx, q, command }) {
ctx.reply(response.wait)
let bingimgJson = await tool.fetchJson(`https://aemt.me/bingimg?text=${q}`)
for (let i of bingimgJson.result) {
await ctx.replyWithPhoto({ url: i })
}
}}