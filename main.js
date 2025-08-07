/**
  # Created By ZackMans
  # https://youtube.com/@BuildTheCraft
  # https://github.com/ZackMans
*/
global.attr = {};
attr.commands = new Map();
attr.functions = new Map();
require("./config.js")

const { Extra, Markup, Telegraf, session } = require('telegraf');
const fs = require("fs");
const moment = require("moment-timezone");
const chalk = require("chalk");
const chokidar = require("chokidar");
const { exec, spawn, execSync } = require("child_process")
const path = require("path");
const { addhit } = require("./database/hit.js");

// Connect To Bot
const bot = new Telegraf(token);

const ReadFitur = () => {
let pathdir = path.join(__dirname, "./commands");
let fitur = fs.readdirSync(pathdir);
for (let fold of fitur) {
for (let filename of fs.readdirSync(__dirname + `/commands/${fold}`)) {
plugins = require(path.join(__dirname + `/commands/${fold}`, filename));
plugins.function ? (attr.functions[filename] = plugins) : (attr.commands[filename] = plugins);
}
}
console.log("Command loaded successfully");
};
ReadFitur();

// Start Command Bot
bot.start((ctx) => {
const { startRespon } = require("./commands/other/start.js")
startRespon(ctx)
});

/* EVENT AREA */
bot.on("message", async(ctx) => {
try {
await require("./lib/serialize").serialize(bot, ctx);
require("./lib/handler")(bot, ctx, 0);
//console.log(ctx.message)
} catch (e) {
console.log(String(e))
}
})

bot.on("callback_query", async(ctx) => {
try {
await require("./lib/serialize").serialize(bot, ctx);
require("./lib/handler")(bot, ctx, 1);
} catch (e) {
//console.log(String(e))
}
})

// Console Log
bot.launch();

// Fungsi untuk mereset limit
function resetLimit() {
    console.log("Limit telah direset!");
    let Us = Object.values(users)
    let jumLm = Us.filter(v => v.limit == 0).length
    if (jumLm > 0) {
        rmsg.limit.berhasil(ctx, setting.group.id, { id: setting.group.thread.information, jumlah: jumLm, waktu: moment.tz("Asia/Jakarta").format("DD MMMM YYYY") })
    } else {
        rmsg.limit.tidakjadi(ctx, setting.group.id, { id: setting.group.thread.information })
    }
    
    Us.forEach(v => {
        if (v.limit == 0) {
            v.limit = setting.limit[users[v.id].rank]
        }
    })
}

module.exports = { resetLimit }
/* Auto Update File */
let file = require.resolve(__filename);
Object.freeze(global.reload)
delete require.cache[file]
var watcher = chokidar.watch('./commands', { ignored: /^\./, persistent: true });
watcher
.on('error', function(error) { console.error('Error happened', error); })
.on('add', function(path) { global.reload(path) })
.on('change', function(path) { global.reload(path) })
.on('unlink', function(path) { global.reload(path) })
process.on("uncaughtException", function(err) {
console.error(err);
});