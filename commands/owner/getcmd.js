const fs = require("fs");
const path = require("path");

module.exports = {
name: ["getcmd","gf"],
param: "<filename>",
cmd: ["getcommand", "getcmd", "gf"],
category: "owner",
owner: true,
async handler(m, { ctx, q, prefix, args, command }) {
if (!q) throw `where is the text?\n\nexample: ${prefix + command} other/menu.js`
if (!(args[0] == "-d" ? args[1] : true)) return ctx.reply(`where is the text?\n\nexample: ${prefix + command} -d index.js`)

const filename = path.join(__dirname, `${command == "gf" ? "../../" : "../"}${args[0] == "-d" ? args[1] : q}`)
if (!fs.existsSync(filename)) return ctx.reply(`
'${filename}' not found!`)

if (args[0] == "-d") return ctx.replyWithDocument({ source: filename })
if (fs.readFileSync(filename, 'utf8').length > setting.maxChunkSize) return ctx.replyWithDocument({ source: filename }) && ctx.reply(`Maaf teks pesan melebihi batas ${setting.maxChunkSize} karakter, jadi dikirim melalui document`)
ctx.reply(fs.readFileSync(filename, 'utf8'))
}}