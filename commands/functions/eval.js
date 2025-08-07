const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
name: "eval",
function: true,
category: "owner",
async handler(m, { bot, chats, budy, body, ctx, prefix, args, command, isCreator, q }) {
//if (body.startsWith('> while')) return
if (body.startsWith('>')) {
if (!isCreator) return
try {
let evaled = await eval(body.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await splitString(ctx, evaled)
} catch (err) {
ctx.reply(String(err))
}
}
if (body.startsWith('<')) {
if (!isCreator) return
try {
let evald = await eval(body.slice(2))
let evaled = JSON.stringify(evald, null, `\t`)
return splitString(ctx, evaled)
} catch (e) {
ctx.reply(String(e))
}
}
if (body.startsWith('$')) {
if (!isCreator) return
if (!body.slice(2)) return
exec(body.slice(2), (err, stdout) => {
if(err) return ctx.reply(String(err))
if (stdout) return ctx.reply(stdout)
})
}
}}