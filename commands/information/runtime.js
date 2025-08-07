module.exports = {
name: "runtime",
cmd: ["runtime","uptime"],
category: "information",
async handler(m, { ctx }) {
ctx.reply(`${tool.toTimer(process.uptime())}`)
}}