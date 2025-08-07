module.exports = {
name: ["igstory"],
param: "<username>",
cmd: ["igstory"],
category: "media",
query: true,
limit: true,
async handler(m, { ctx, q, command, args }) {
await ctx.reply(response.wait)
let igstoryJson = await tool.fetchJson(`https://rest-api.akuari.my.id/downloader/igStory?username=${q}`)
for (let i of igstoryJson.respon.data) {
if (i.type == "image") {
await ctx.replyWithPhoto({ url: i.url })
}
if (i.type == "video") {
await ctx.replyWithVideo({ url: i.url })
}
}
}}