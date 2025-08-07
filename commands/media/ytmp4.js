module.exports = {
name: ["ytmp4"],
param: "<url>",
cmd: ["ytmp4"],
category: "media",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q, command }) {
await ctx.reply(response.wait)
let dayt = await bochil.youtubedl(q)
let arr = Object.values(dayt.video)
let dayt2 = arr.filter(v => v.fileSize !== 0).sort((a, b) => b.fileSize - a.fileSize)[0]
ctx.sendFileUrl(await dayt2.download(), { caption: dayt.title, reply_parameters: { message_id: m.message_id }})
}}