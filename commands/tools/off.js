module.exports = {
name: ["off"],
param: "<feature>",
cmd: ["off"],
category: "tools",
query: true,
async handler(m, { ctx, q, command, args }) {
let f = args[0]
if (f == "autodl" || f == "autodownload") {
if (users[m.from.id].autodl != null) {
if (!users[m.from.id].autodl) return ctx.reply("Fitur auto download sudah mati")
users[m.from.id].autodl = false
ctx.reply("Fitur auto download berhasil di matikan")
} else {
users[m.from.id].autodl = false
ctx.reply("Fitur auto download berhasil di matikan")
}
} else {
ctx.reply(`feature "${f}" tidak terdaftar\n - autodownload\n - autodl`)
}
}}