module.exports = {
name: ["serverbedrockstatus","serverbs","sbs"],
param: "<address>",
cmd: ["serverbedrockstatus","serverbs","sbs"],
category: "minecraft",
query: true,
async handler(m, { ctx, q, prefix, args, command }) {
let isAddress = args[0]
if (!isAddress.includes(":")) return ctx.reply(`Masukan address dengan benar\nExample: ${prefix + command} play.bloodworld.com:19132`)
let port = args[0].split(":")[1]
if (isNaN(port)) return ctx.reply("port harus berupa angka")
let bs = await tool.fetchJson("https://api.mcstatus.io/v2/status/bedrock/" + args[0])
let format = ""
if (bs.online) {
format = `${gatas} Name : ${bs.motd.raw.split("\n")[0]}\n${gtn} Host : ${bs.host}\n${gtn} Ip : ${bs.ip_address}\n${gtn} Port : ${bs.port}\n${gtn} Version : ${bs.version.name}\n${gtn} Players: ${bs.players.online} / ${bs.players.max}\n${gtn} Mode : ${bs.gamemode}\n${gbawah} Id : ${bs.server_id}`
}
if (!bs.online) {
format = ` Server Offline `
}
ctx.reply(format)
}}