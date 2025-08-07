module.exports = {
name: ["bc","broadcast"],
param: "<reply>",
cmd: ["bc", "broadcast"],
category: "owner",
owner: true,
quoted: true,
async handler(m, { ctx, q, prefix, command }) {
let usid = await Object.keys(users)
for (let i of usid) ctx.telegram.forwardMessage(i, m.chat.id, m.reply_to_message.message_id)
ctx.reply(`Berhasil mengirim pesan ke ${usid.length} user, private chat`, { reply_parameters: { message_id: m.message_id }})
}}