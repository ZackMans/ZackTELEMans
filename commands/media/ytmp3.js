module.exports = {
name: ["ytmp3"],
param: "<url>",
cmd: ["ytmp3"],
category: "media",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q, command }) {
await ctx.reply(response.wait)
let dayt = await bochil.youtubedl(q)
let arr = Object.values(dayt.audio)
let dayt2 = arr.filter(v => v.fileSize !== 0).sort((a, b) => b.fileSize - a.fileSize)[0]
ctx.replyWithAudio({ url: await dayt2.download(), filename: dayt.title + ".mp3" }, { reply_parameters: { message_id: m.message_id }})
}}