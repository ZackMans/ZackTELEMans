module.exports = {
name: ["youtubesearch","ytsearch"],
param: "<query>",
cmd: ["youtubesearch","ytsearch"],
category: "search",
query: true,
limit: true,
async handler(m, { ctx, q, command }) {
bochil.youtubeSearch(q).then((data) => {
if (data.video.length > 0) {
data.video.forEach(v => {
ctx.reply(v.url)
})
} else {
ctx.reply("tidak menemukan hasil")
}
})
}}