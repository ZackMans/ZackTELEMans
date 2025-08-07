module.exports = {
name: ["group"],
cmd: ["group"],
category: "other",
async handler(m, { ctx, q, command, args }) {
let teks = `Hi @${ctx.from.username}
I am an automated system (Telegram Bot) that can help to do something, search and get data / information only through Telegram`

let inlinekey = [
[
{ text: 'TELEGRAM', url: group.telegram },
],
[
{ text: 'WHATSAPP', url: group.whatsapp }
],
[
{ text: 'BACK', callback_data: '.start' }
]
]

ctx.replyWithPhoto(thumbnail, { caption: teks, parse_mode: 'Markdown', reply_markup: { inline_keyboard: inlinekey }})
}}