module.exports = {
name: ["mediafire"],
param: "<url>",
cmd: ["mediafire"],
category: "media",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q, command, args }) {
await ctx.reply(response.wait)
let result = await scraper.media.mediafire(q)
if (result.status) {
require("axios").head(result.link).then(async(d) => {
if (d.headers["content-length"] < 49000000) {
await ctx.reply("File telah ditemukan.. System sedang mengirim..")
ctx.replyWithDocument({ url: result.link, contentType: result.mimetype, filename: result.filename })
} else {
ctx.reply("File size melebihi 50mb\n" + result.link)
}
})
} else {
ctx.reply("File tidak ada, coba cek linknya")
}
}}