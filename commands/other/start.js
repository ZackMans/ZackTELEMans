async function startRespon(ctx) {
if (users[ctx.from.id] == undefined) {
users[ctx.from.id] = {
id: ctx.from.id,
username: m.from.username ? m.from.username : null,
limit: setting.limit.undefined
}
await fs.writeFileSync('./database/json/user.json', JSON.stringify(users, null, 2))
}
let teks = `Hi @${ctx.from.username}
I am an automated system (Telegram Bot) that can help to do something, search and get data / information only through Telegram`

let inlinekey = [
[
{ text: 'YOUTUBE', url: medsos.youtube },
],
[
{ text: 'GROUP', callback_data: '.group' }
],
[
{ text: 'MENU', callback_data: '.menu' }
]
]

ctx.replyWithPhoto(thumbnail, { caption: teks, parse_mode: 'Markdown', reply_markup: { inline_keyboard: inlinekey }})
}

module.exports = {
name: ["start"],
cmd: ["start"],
category: "other",
async handler(m, { ctx, q, command, args }) {
startRespon(ctx)
}, startRespon}