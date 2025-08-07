const { exec } = require("child_process");

module.exports = {
name: "disk",
cmd: ["disk"],
category: "information",
async handler(m, { ctx }) {
exec('cd && du -h --max-depth=1', (err, stdout) => {
if (err) return ctx.reply(String(err))
if (stdout) return ctx.reply(stdout)
})
}}