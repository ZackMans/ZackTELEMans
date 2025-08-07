module.exports = {
name: ["on"],
param: "<feature>",
cmd: ["on"],
category: "tools",
query: true,
async handler(m, { ctx, q, command, args }) {
let f = args[0]
if (f == "autodl" || f == "autodownload") {
if (users[m.from.id].autodl != null) {
if (users[m.from.id].autodl) return ctx.reply("Fitur auto download sudah aktif")
users[m.from.id].autodl = true
ctx.reply("Fitur auto download berhasil di aktifkan")
} else {
users[m.from.id].autodl = true
ctx.reply("Fitur auto download berhasil di aktifkan")
}
} else {
ctx.reply(`feature "${f}" tidak terdaftar\n - autodownload\n - autodl`)
}
}}