module.exports = {
name: ["topserverbedrock","topsb"],
param: "<page>",
cmd: ["topserverbedrock","topsb","tsb"],
category: "minecraft",
async handler(m, { ctx, args }) {
let nmber = isNaN(args[0]) ? false : args[0]
scraper.minecraft.topserver(nmber).then(async({ server }) => {
var format = `TOP ${nmber ? nmber : "1"} SERVER BEDROCK\ntop server minecraft bedrock, region indonesia`
for (let i of server) {
format += `\n\n★ Ip : ${i.ip}\n★ Port : ${i.port}\n★ Version : ${i.versi}\n★ Online : ${i.player}`
}
ctx.reply(format)
})
}}