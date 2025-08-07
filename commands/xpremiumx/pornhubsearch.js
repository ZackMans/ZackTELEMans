module.exports = {
name: ["pornhubsearch","phs"],
param: "<query>",
cmd: ["pornhubsearch","phs"],
category: "xpremiumx",
query: true,
owner: true,
limit: true,
async handler(m, { ctx, q, command, args }) {
const { PornHub } = require("pornhub.js")
const ph = new PornHub()
let phJson = await ph.searchVideo(q)
let phjs = phJson.data
var phntex = ""
for (let i = 0; i < phjs.length; i++) {
phntex = `- Title : ${phjs[i].title}\n - Link : ${phjs[i].url}`
ctx.reply(phntex)
}
}}