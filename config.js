/**
  # Created By ZackMans
  # https://youtube.com/@BuildTheCraft
  # https://github.com/ZackMans
*/
const fs = require("fs");
const pathh = require("path");
const chalk = require("chalk");
const syntaxerror = require("syntax-error");
const { Low, JSONFile } = require("./database/lowdb");
const database = new Low(new JSONFile("database/json/database.json"));
const dbase = require('./database/index.js');

global.token = "6804072909:AAFsBMZNTAqMtlfow5sQUE548OhI9Z1NGmI" // ambil token bot di @BotFather telegram ( wajib di isi )

global.owner = ["6389715568"] // tambahkan atau ganti id telegram ( wajib di isi )
global.author = "ZackMans"
global.botName = "𝗭𝗔𝗖𝗞𝗠𝗔𝗡𝗦 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟"
global.shp = "◦"
global.gatas = "┌"
global.gtengah = "│"
global.gtn = "├"
global.gbawah = "└"
global.loading = {
  circular: ["\u25DC","\u25DD","\u25DE","\u25DF","\u25DC","\u25E0","\u25DD","\u25DE","\u25E1","\u25DC"],
}

global.thumbnail = "https://zackmans.github.io/media/log3.jpg" 

global.medsos = {
  instagram: "https://instagram.com/oranggaaring",
  youtube: "https://youtube.com/@BuildTheCraft",
  whatsapp: "https://api.whatsapp.com/send?phone=6281385062956"
}

global.group = {
  telegram: "https://t.me/+9fJ85T80hCw4ZDY1",
  whatsapp: "https://chat.whatsapp.com/DvLA5dm50I44OY9WMejoTm"
}

global.setting = {
  log: {
    msg: true // true untuk mengaktifkan console log dari pesan yang diterima dan sebaliknya
  },
  group: {
    id: -1002222542073,
    thread: {
      information: 59
    }
  },
  limit: {
    platinum: 100, // Atur limit awal
    ruby: 200, // Atur limit awal
    undefined: 50 // Atur limit awal
  },
  maxChunkSize: 4096 // karakter ( Jangan diubah )
}

//global.prefix = "."

const response = {
	id: {
		wait: "Tunggu sebentar, permintaan anda sedang diproses...",
		owner: "Perintah ini hanya untuk owner!",
		admin: "Perintah ini hanya untuk admin group!",
		botadmin: "Bot harus menjadi admin group untuk melakukan perintah ini!",
		group: "Perintah ini hanya dapat dilakukan didalam grup!",
		private: "Perintah ini hanya dapat dilakukan didalam Private Chat",
		error: "Command error, silahkan coba beberapa saat lagi...",
		errorlink: "Mohon masukkan link yang benar",
		limit: "Limit anda sudah habis, silahkan gunakan fitur ini esok hari"
	},
	en: {
		wait: "Wait a minute, your request is being processed...",
		owner: "This command is only for the owner!",
		admin: "This command is only for the group admin!",
		botadmin: "The bot must be a group admin to perform this command!",
		group: "This command can only be done in groups!",
		private: "This command can only be done in private chat!",
		error: "Command error, please try again later...",
		errorlink: "Please enter the correct link!",
		limit: "Your limit has run out, please use this feature tomorrow"
	}
}

const bahasa = "id"; // en/id
global.response = response[bahasa];

global.users = JSON.parse(fs.readFileSync('./database/json/user.json'));
global.rmsg = {
  "limit": {
    "berhasil": function(ctx, jid, options) {
      let text = `<b>PROSES RESET LIMIT BERHASIL!!!</b>

Zackmans dengan senang hati menginformasikan bahwa limit dari <b>${options.jumlah} pengguna</b> telah berhasil direset. 🚀

🔍 <b>DETAIL RESET:</b>
- <b>Jumlah Pengguna:</b> ${options.jumlah}
- <b>Status:</b> Berhasil
- <b>Waktu Proses:</b> ${options.waktu}

Kami berkomitmen untuk memberikan pengalaman terbaik bagi semua pengguna kami. Jika ada pertanyaan lebih lanjut atau bantuan yang dibutuhkan, jangan ragu untuk menghubungi tim dukungan kami! 💬

Terima kasih telah menggunakan layanan zackmans! 🙌✨`
      ctx.telegram.sendMessage(jid, text, { parse_mode: "HTML", reply_to_message_id: options.id })
    },
    "tidakjadi": function(ctx, jid, options) {
      let text = `<b>PROSES RESET LIMIT</b>

Dengan ini kami informasikan bahwa proses reset limit tidak jadi dilakukan. Hal ini disebabkan karena tidak ada pengguna yang saat ini memiliki limit 0. Mohon untuk memperhatikan informasi ini dan jika ada pertanyaan lebih lanjut, silakan menghubungi tim kami. Terima kasih atas perhatian Anda! 😊`
      ctx.telegram.sendMessage(jid, text, { parse_mode: "HTML", reply_to_message_id: options.id })
    }
  }
}
global.tool = require("./lib/tools");
global.bochil = require("@bochilteam/scraper-sosmed")
global.xzons = require("xzons-api")
global.betabotz = require("betabotz-tools")
global.scraper = require("./lib/scraper/index.js")
global.db = database;
global.dbs = new dbase();

// Reload command / function
let pluginFilter = (filename) => /\.js$/.test(filename);
let pluginFolder = pathh.join(__dirname, "./commands");
global.reload = (path) => {
	path = `./${path.replace(/\\/g, '/')}`
	filename = path.split("/")[3]
	if (pluginFilter(filename)) {
		let dir = pathh.join(pluginFolder, './' + path.split('/')[2] + '/' + path.split('/')[3])
		isi = require(path)
		if (dir in require.cache) {
			delete require.cache[dir];
			if (fs.existsSync(dir)) console.info(`re - require plugin '${path}'`);
			else {
				console.log(`deleted plugin '${path}'`);
				return isi.function
					? delete attr.functions[filename]
					: delete attr.commands[filename];
			}
		} else console.info(`requiring new plugin '${filename}'`);
		let err = syntaxerror(fs.readFileSync(dir), filename);
		if (err) console.log(`syntax error while loading '${filename}'\n${err}`);
		else
			try {
				isi.function
					? (attr.functions[filename] = require(dir))
					: (attr.commands[filename] = require(dir));
			} catch (e) {
				console.log(e);
			} finally {
				isi.function
					? (attr.functions = Object.fromEntries(
							Object.entries(attr.functions).sort(([a], [b]) => a.localeCompare(b))
					  ))
					: (attr.commands = Object.fromEntries(
							Object.entries(attr.commands).sort(([a], [b]) => a.localeCompare(b))
					  ));
			}
	}
};

global.splitString = async(ctx, stringe, extra) => {
if (stringe.length > setting.maxChunkSize) {
const splittedString = await tool.splitString(stringe, setting.maxChunkSize);
for (let i of splittedString) {
await ctx.reply(i, extra)
}
}
if (stringe.length <= setting.maxChunkSize) {
ctx.reply(stringe, extra)
}
}

global.YtIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:|watch\?.*(?:|\&)v=|embed\/|v\/|shorts\/)|youtu\.be\/)([-_0-9A-Za-z]{11}|[-_0-9A-Za-z]{10})/
global.IgIdRegex = /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|stories|tv)\/([^/?#&]+))/
global.FbIdRegex = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/
global.TwIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|mobile\.|))(?:twitter\.com)\/([a-zA-Z0-9-_\.]{3,20})\/(?:status)\/([?=0-9a-z]{15,25})([a-zA-Z=0-9]{3,6})/
global.TtIdRegex = /(?:http(?:s|):\/\/|)(?:www\.|)(?:tiktok.com)\/@([-_0-9A-Za-z\.]{3,20})\/video\/([0-9]{19,25})?.(?:sender_device=pc&sender_web_id=[0-9]{19,25})&.(?:s_from_webapp=v1&is_copy_url=[0-9]{1})|(?:http(?:s|)):\/\/(?:(?:vt.|vm.)tiktok.com)\/(?:[a-z0-9A-Z]{9,15}\/)|(?:http(?:s|)):\/\/(?:t.tiktok.com)\/(?:i18n\/share\/video)\/([&\?\/a-zA-Z0-9=_-]{333,400})/

/* Auto Update File */
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.white(chalk.bgRedBright(` Update '${__filename}' `)));
delete require.cache[file]
require(file)
})