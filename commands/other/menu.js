const fs = require("fs");
const prettyms = require("pretty-ms");
const { showhit } = require("../../database/hit");

const toTimer = (seconds) => {
 function pad(s) {
  return (s < 10 ? "0" : "") + s;
 }
 var hours = Math.floor(seconds / (60 * 60));
 var minutes = Math.floor((seconds % (60 * 60)) / 60);
 var seconds = Math.floor(seconds % 60);

 //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
 return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

async function Menu(m, { ctx, prefix, cmd, tags }) {

let d = new Date(new Date() + 3600000);
let date = d.toLocaleDateString("id", { day: "numeric", month: "long", year: "numeric", });
const hit = Object.values(await showhit()).map((ht) => ht.total);
const total_hit = await eval(hit.join(" + "));

let menu = `${botName}\nHello ${m.from.username ? "@" + m.from.username : m.from.first_name}\nI am an automatic response to messages, to help you find something you want, such as getting data and information\n\n •  𝗟𝗶𝗯𝗿𝗮𝗿𝘆: Telegraf\n •  𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻: Assistant\n\n`
menu += `${gatas}  ${shp} Uptime : ${await toTimer(process.uptime())}\n`;
menu += `${gtengah}  ${shp} Total : ${cmd.length} cmd\n`;
menu += `${gtengah}  ${shp} Version : ${require("../../package.json").dependencies.telegraf}\n`;
menu += `${gtengah}  ${shp} Hit : ${total_hit ? total_hit : 0} used\n`
menu += `${gtengah}  ${shp} Limit : ${users[m.from.id].limit}\n`
menu += `${gbawah}  ${shp} Prefix Used: [ ${prefix} ]\n`;
let numtag = 1
menu += `\n${gatas}  ${shp} **${tags.length > 7 ? "": "MENU "}${tags.toUpperCase()}**\n`;
const filt_cmd = cmd.filter((mek) => mek.tag == tags);
const map_cmd = await filt_cmd.map((mek) => mek.name);
/*const sort = await map_cmd.sort(function (a, b) {
return a.length - b.length;
});
*/
for (let j = 0; j < map_cmd.length; j++) {
menu += `${gtengah}  ${shp} ${prefix}${map_cmd[j]}\n`;
}
menu += `${gbawah}\n`
numtag++

menu += `\n${gatas}  ${shp} **ADVANCED**\n`;
menu += `${gtengah}  ${shp} >\n`
menu += `${gtengah}  ${shp} <\n`
menu += `${gtengah}  ${shp} $\n`
menu += `${gbawah}\n`

let inlinekey = [
[
{ text: 'GROUP', callback_data: '.group' }
],
[
{ text: 'OWNER', callback_data: '.owner' }
]
]

ctx.replyWithPhoto(thumbnail, { caption: menu, parse_mode: 'Markdown', reply_markup: { inline_keyboard: inlinekey }})
}

module.exports = {
name: "menu",
param: "<category>",
cmd: ["menu"],
category: "other",
async handler(m, { ctx, prefix, q, args, isCreator }) {
const cmd = [];
Object.values(attr.commands)
.filter((cm) => !cm.disabled && !cm.ignored)
.map((cm) => {
if (Array.isArray(cm.name)) {
for (let i=0; i<cm.name.length; i++) {
cmd.push({
name: `${cm.name[i]}${cm.param ? 
` ${cm.param}` : ""}`,
cmd: [cm.cmd.find(y => y == cm.name[i])],
param: cm.param ? cm.param : false,
tag: cm.category ? cm.category : "Uncategorized",
desc: cm.desc ? cm.desc : '-'
});
}
} else {
cmd.push({
name: `${cm.name}${cm.param ? 
` ${cm.param}` : ""}`,
cmd: cm.cmd,
param: cm.param ? cm.param : false,
tag: cm.category ? cm.category : "Uncategorized",
desc: cm.desc ? cm.desc : '-'
});
}
});

const map_tag = cmd.map((mek) => mek.tag);
const sort_tag = await map_tag.sort();
const tag_data = new Set(sort_tag);
const tagse = [...tag_data];
const tags = q ? tagse.includes(args[0]) ? tagse.find(v => v == args[0]) :  "undefined" : "other"
if (tags == "undefined") {
var mforme = `category "${args[0]}" tidak terdaftar dalam list menu`
for (let tag of tagse) {
if (tag === "xpremiumx") {
if (isCreator) {
mforme += `\n -  ${tag}`
}
} else {
mforme += `\n -  ${tag}`
}
}
return ctx.reply(mforme)
}
if (tags == "xpremiumx") {
if (isCreator) return Menu(m, { ctx, prefix, cmd, tags })
var mforme = `category "${args[0]}" tidak terdaftar dalam list menu`
for (let tag of tagse) {
if (tag === "xpremiumx") {
if (isCreator) {
mforme += `\n -  ${tag}`
}
} else {
mforme += `\n -  ${tag}`
}
}
return ctx.reply(mforme)
}
Menu(m, { ctx, prefix, cmd, tags })
}, Menu}