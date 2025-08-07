module.exports = {
name: "uuid",
cmd: ["uuid"],
category: "tools",
async handler(m, { ctx, q, command, args }) {
if (!q) {
ctx.reply(`${tool.uuid()}`, { reply_parameters: { message_id: m.message_id }})
}
if (q) {
ctx.reply(`${tool.isUuid(args[0])}`, { reply_parameters: { message_id: m.message_id }})
}
}}