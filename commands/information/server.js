const os = require('os');
const fetch = require('node-fetch');

function formatSize(bytes) {
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
if (bytes === 0) return '0 Bytes';
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function ucword(str) {
return str.replace(/\b\w/g, function(l) {
return l.toUpperCase();
});
}

module.exports = {
name: "server",
cmd: ["server"],
category: "information",
async handler(m, { ctx }) {
let format = await fetch('https://ip-json.vercel.app/')
.then(res => res.json())
.then(json => {
delete json.status;
let caption = "";
caption += `${gatas} OS : ${os.type()} (${os.arch()} / ${os.release()})\n`;
caption += `${gtn} Ram : ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}\n`;
for (let key in json.result) caption += `${gtn} ${ucword(key)} : ${json.result[key]}\n`;
caption += `${gtn} Uptime : ${tool.toTimer(os.uptime())}\n`;
caption += `${gbawah} Processor : ${os.cpus()[0] ? os.cpus()[0].model : "-"}\n\n`;
ctx.reply(caption)
}).catch(error => {
console.log(error)
})
}}