module.exports = {
name: ["pornhubdl","phdl"],
param: "<url>",
cmd: ["pornhubdl","phdl"],
category: "xpremiumx",
query: true,
url: true,
owner: true,
limit: true,
async handler(m, { ctx, q, command, args }) {
const { PornHub } = require("pornhub.js")
const ph = new PornHub()
ph.video(q).then(e => {
let vqu = e.mediaDefinitions.map(v => v.quality).sort((a, b) => b - a)
let url = e.mediaDefinitions.find(v => v.quality == vqu[0]).videoUrl.replaceAll("\\","")
ctx.sendM3u8ToMp4(url, e.title, { thumbnail: { url: e.thumb } })
})
}}