const fs = require("fs");

module.exports = {
name: ["addcmd","sf"],
param: "<reply code>",
cmd: ["addcommand", "addcmd", "sf"],
category: "owner",
owner: true,
quoted: true,
async handler(m, { ctx, q, command, isQDocument }) {
if (!q) throw `where is the text?\n\nexample: ${prefix + command} owner/orangkece.js`
const filename = `./${command == "sf" ? "" : "commands/"}${q}`;
if (isQDocument) {
ctx.telegram.getFileLink(m.reply_to_message.document.file_id).then(({ href }) => {
fetch(href).then(response => response.text())
.then(data => {
fs.writeFile(filename, data, (err) => {
if (err) return ctx.reply(String(err))
ctx.reply(`Succsess add ${command == "sf" ? "file" : "command"} '${filename}'`);
})
})
})
} else {
await fs.writeFileSync(filename, m.reply_to_message.text);
ctx.reply(`Succsess add ${command == "sf" ? "file" : "command"} '${filename}'`);
}
}}