/**
  # Created By ZackMans
  # https://youtube.com/@BuildTheCraft
  # https://github.com/ZackMans
*/
require("../config.js");
const fs = require("fs");
const moment = require("moment-timezone");
const chalk = require("chalk");
const ms = require('parse-ms');
const { addhit } = require("../database/hit");

async function handler(bot, ctx, filterstype) {
if (filterstype == 0) {
var cbq = false
var m = ctx.message
var body = (typeof m.text == 'string' ? m.text : '')
}
if (filterstype == 1) {
cbq = ctx.update.callback_query
m = cbq.message
body = (typeof cbq.data == 'string' ? cbq.data : '')
ctx.deleteMessage()
}
const type = cbq ? "text" : m.text ? "text" : m.sticker ? "sticker" : m.photo ? "image" : m.video ? "video" : m.audio ? "audio" : m.document ? "document" : m.location ? "location" : null
const qtype = m.reply_to_message ? m.reply_to_message.text ? "text" : m.reply_to_message.sticker ? "sticker" : m.reply_to_message.photo ? "image" : m.reply_to_message.video ? "video" : m.reply_to_message.audio ? "audio" : m.reply_to_message.document ? "document" : m.reply_to_message.location ? "location" : null : null
const chats = type == "text" ? body : type == "image" ? m.caption : type == "video" ? m.caption : ""
global.prefix = /^[/.]/.test(chats) ?  chats.match(/^[/.]/) : "."
const budy = (type == "text" && type == "image" && type == "video") || chats.startsWith(prefix) ? chats : "";
const botUName = ctx.botInfo.username
const commands = budy || "";
let UB = commands.split("@")[1]
let CM = commands != "" ? commands.toLowerCase().split(" ")[0].slice(1) : "";
if (UB == botUName) {
var command = CM.split("@")[0]
} else {
command = CM
}
const args = chats.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCreator = owner.includes(m.from.id.toString())
const pushname = m.from.username ? m.from.username : m.from.first_name ? m.from.first_name : m.from.id
const isGroup = m.chat.type == "supergroup"
const admins = isGroup ? await ctx.getChatAdministrators() : false
const isAdmin = isGroup ? admins.some(admin => admin.user.id === m.from.id) : false

const isQuoted = m.reply_to_message ? true : false
const isQImage = qtype == "image"
const isQVideo = qtype == "video"
const isQSticker = qtype == "sticker"
const isQAudio = qtype == "audio"
const isQLocation = qtype == "location"
const isQDocument = qtype == "document"

const extra = {
bot,
chats,
budy,
body,
ctx,
prefix,
args,
command,
isCreator,
q,
isQDocument
};

global.errormes = async (coman, e, mm) => {
eror = `Command error, silahkan coba beberapa saat lagi...\n\nError Log :\n${String(e)}`;
ctx.reply(eror);
};

if (setting.log.msg) if (command) console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(` ${chats || type} `)) + '\n' + chalk.blueBright('=> Dari'), chalk.green(pushname), chalk.yellow(m.from.id) + '\n' + chalk.magenta('=> Di'), chalk.green(isGroup ? m.chat.title : 'Private Chat', chalk.yellow(m.chat.id)) + '\n' + chalk.black(chalk.bgBlue(` ${moment.tz("Asia/Jakarta").format("DD MMMM YYYY HH:mm:ss")} ( Waktu Indonesia Barat ) `)))

if (users[m.from.id] == undefined) {
users[m.from.id] = {
id: m.from.id,
username: m.from.username ? m.from.username : null,
limit: setting.limit.undefined
}
await fs.writeFileSync('./database/json/user.json', JSON.stringify(users, null, 2))
}
 
for (let func of Object.values(attr.functions).filter(fuc => !fuc.antispam && !fuc.typo)) {
await func.handler(m, extra);
}

const cmd = Object.values(attr.commands).find((cmn) => cmn.cmd && cmn.cmd.includes(command) && !cmn.disabled);

if (cmd == undefined) return require('../commands/functions/typo').handler(m, extra)

if (cmd.owner && !isCreator) return ctx.reply(response.owner);
else if (cmd.group && !isGroup) return ctx.reply(response.group);
else if (cmd.private && isGroup) return ctx.reply(response.private);
else if (cmd.admin && isGroup && !isAdmin && !isCreator) return ctx.reply(response.admin);
else if (cmd.limit && users[m.from.id].limit <= 0) return ctx.reply(response.limit)
else if (cmd.quoted && typeof cmd.quoted == "object") {
  if (cmd.quoted.image && !isQImage) return ctx.reply("Please reply a image message");
  else if (cmd.quoted.video && !isQVideo) return ctx.reply("Please reply a video message");
  else if (cmd.quoted.audio && !isQAudio) return ctx.reply("Please reply a audio message");
  else if (cmd.quoted.sticker && !isQSticker) return ctx.reply("Please reply a sticker message");
  else if (cmd.quoted.document && !isQDocument) return ctx.reply("Please reply a document message");
  else if (cmd.quoted.location && !isQLocation) return ctx.reply("Please reply a location message");
} else if (cmd.quoted && !isQuoted) {
  if(cmd.quoted != true) return ctx.reply(cmd.quoted)
  return ctx.reply("Please reply a message");
} else if (cmd.query && !q) {
  if(cmd.query != true) return ctx.reply(cmd.query, {msgId: cmd.cmd.find(y => y == command)})
  return ctx.reply(`Please fill in the ${cmd.param} parameters\nInstructions : ${prefix}${cmd.name} ${cmd.param}`, {msgId: cmd.cmd.find(y => y == command)});
}
else if (cmd.url && !tool.isUrl(q)) return ctx.reply("The input must be a url!")
if (cmd.url) extra.q = tool.isUrl(q)[0]
const cmdhit = Array.isArray(cmd.name) ? Array.isArray(cmd.cmd) ? cmd.cmd.find(cm => cm == command) : cmd.cmd : cmd.name

try {
cmd.handler(m, extra);
addhit(cmd.name, true);
if (cmd.limit && users[m.from.id].limit > 0) {
users[m.from.id].limit -= 1
await fs.writeFileSync('./database/json/user.json', JSON.stringify(users, null, 2))
}
} catch (e) {
await errormes(command, e, m);
addhit(cmd.name, false);
}
}

module.exports = handler;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(chalk.white(chalk.bgRedBright(` Update '${__filename}' `)));
delete require.cache[file];
require(file)
});