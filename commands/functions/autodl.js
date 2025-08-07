/**
  # Created By ZackMans
  # https://youtube.com/@BuildTheCraft
  # https://github.com/ZackMans
*/
async function igDL(url, ctx) {
console.log("instagram downloader...")
let igdlJson = await betabotz.instagram(url)
for (let i of igdlJson.result) {
await ctx.sendFileUrl(i._url)
}
}

async function fbDL(url, ctx) {
console.log("facebook downloader...")
let fbdlJson = await betabotz.facebook(url)
let i = fbdlJson.result
await ctx.sendFileUrl(i.hd_q)
ctx.reply(i.title)
}

async function twDL(url, ctx) {
console.log("twitter downloader...")
let twdlJson = await betabotz.twitter(url)
for (let i of twdlJson.result.mediaURLs) {
await ctx.sendFileUrl(i)
}
ctx.reply(i.text)
}

async function ttDL(url, ctx) {
console.log("tiktok downloader...")
let ttdlJson = await betabotz.tiktok(url)
let i = ttdlJson.result.data
let teks = `<b>TIKTOK DOWNLOAD</b>\n<a href="${i.music}">Music</a>, <a href="${i.wmplay}">Watermak</a>`
await ctx.sendFileUrl(i.play, { thumbnail: { url: i.cover }, caption: teks, parse_mode: 'HTML' })
}

async function aiovDL(url, ctx) {
console.log("allinonevideo downloader...")
try {
let vdlJson = await scraper.media.aiovdl(url)
for (let i of vdlJson.medias) {
await ctx.sendFileUrl(i.url)
}
ctx.reply(`${vdlJson.title}`)
} catch(e) {
ctx.reply(String(e))
}
}

module.exports = {
name: "autodl",
function: true,
category: "media",
async handler(m, { bot, chats, budy, body, ctx, prefix, args, command, isCreator, q }) {
if (users[m.from.id].autodl) {
if (m.text.startsWith("http")) {

try {
if (IgIdRegex.test(m.text)) {
igDL(m.text, ctx)
}
if (FbIdRegex.test(m.text)) {
fbDL(m.text, ctx)
}
if (TwIdRegex.test(m.text)) {
twDL(m.text, ctx)
}
if (TtIdRegex.test(m.text)) {
ttDL(m.text, ctx)
}
} catch {
if (IgIdRegex.test(m.text) || FbIdRegex.test(m.text) || TwIdRegex.test(m.text) || TtIdRegex.test(m.text)) {
aiovDL(m.text, ctx)
}
}

}
}
}, igDL, fbDL, twDL, ttDL, aiovDL}