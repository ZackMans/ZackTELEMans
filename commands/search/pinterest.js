module.exports = {
name: ["pinterest","pin"],
param: "<query>",
cmd: ["pinterest","pin"],
category: "search",
desc: "Search image from Pinterest.com",
query: true,
limit: true,
async handler(m, { ctx, q, command }) {
scraper.media.pinterest(q).then((data) => {
data.forEach(v => {
ctx.reply(v)
})
})
}}