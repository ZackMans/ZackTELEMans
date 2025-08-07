module.exports = {
name: ["play"],
param: "<query>",
cmd: ["play"],
category: "media",
query: true,
limit: true,
async handler(m, { ctx, q, command }) {
await ctx.reply(response.wait)
let rData = await bochil.youtubeSearch(q)
if (!rData.video[0]) return ctx.reply("Tidak menemukan hasil!")
let fData = rData.video.filter(v => (v.duration.replaceAll(":", "")) < 1000)
if (!fData[0]) return ctx.reply("Tidak menemukan hasil!")
let pLay = Math.floor(Math.random() * fData.length)
let Play = fData[pLay]
let dd = await bochil.youtubedl(Play.url)
let arr = Object.values(dd.audio)
let dyt = arr.filter(v => v.fileSize !== 0).sort((a,b) => b.fileSize - a.fileSize)[0]
ctx.replyWithAudio({ url: await dyt.download(), filename: dd.title + ".mp3"}, { reply_parameters: { message_id: m.message_id }})
}}