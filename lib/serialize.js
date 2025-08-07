const ffmpeg = require('fluent-ffmpeg');
const fs = require("fs");
const chalk = require("chalk");
const axios = require("axios")

async function serialize(bot, ctx) {

ctx.reply = async(text, extra) => {
ctx.sendChatAction("typing")
return ctx.sendMessage(text, ctx.message ? { reply_parameters: { message_id: ctx.message.message_id }, ...extra } : extra)
}

ctx.replyWithPhoto = async(args, extra) => {
ctx.sendChatAction("upload_photo")
return ctx.sendPhoto(args, extra)
}

ctx.replyWithAudio = async(args, extra) => {
ctx.sendChatAction("upload_voice")
return ctx.sendAudio(args, extra)
}

ctx.replyWithDocument = async(args, extra) => {
ctx.sendChatAction("upload_document")
return ctx.sendDocument(args, extra)
}

ctx.replyWithVideo = async(args, extra) => {
ctx.sendChatAction("upload_video")
return ctx.sendVideo(args, { supports_streaming: true, ...extra })
}

ctx.sendM3u8ToMp4 = async (url, nFile, extra) => {
let outputFilePath = `./tmp/${nFile.length > 0 ? nFile.replaceAll(" ", "-") : "output"}.mp4`;
await ffmpeg()
.input(url)
.inputOptions(['-protocol_whitelist file,http,https,tcp,tls,crypto'])
.outputOptions('-c copy')
.on('error', (err) => {
console.error('An error occurred: ' + err.message);
})
.on('end', async () => {
console.log('Conversion finished');
if (fs.statSync(outputFilePath).size < 49000000) {
ctx.replyWithVideo({ source: fs.readFileSync(outputFilePath) }, extra)
} else {
ctx.reply("Size file melebihi 50mb\n" + url, extra)
}
await fs.unlinkSync(outputFilePath)
})
.save(outputFilePath);
}

ctx.sendFileUrl = async (url, extra) => {
let mime = '';
let res = await axios.head(url)
mime = res.headers['content-type']
let type = mime.split("/")[0]+"Message"
/*
if (mime.split("/")[1] === "gif") {
return
}
if (mime.split("/")[1] === "pdf") {
return
}
*/
if (mime.split("/")[1] === "octet-stream") {
mime = res.headers['content-disposition']
if (mime.endsWith("mp4")) {
return ctx.replyWithVideo({ url: url }, extra)
}
if (mime.endsWith("jpg") || mime.endsWith("jpeg") || mime.endsWith("png")) {
return ctx.replyWithPhoto({ url: url }, extra)
}
if (mime.endsWith("mp3")) {
return ctx.replyWithAudio({ url: url }, extra)
}
}
if (mime.split("/")[1].endsWith("mpegurl")) {
return ctx.sendM3u8ToMp4(url, extra)
}
if (mime.split("/")[0] === "image") {
return ctx.replyWithPhoto({ url: url }, extra)
}
if (mime.split("/")[0] === "video") {
return ctx.replyWithVideo({ url: url }, extra)
}
if (mime.split("/")[0] === "audio") {
return ctx.replyWithAudio({ url: url }, extra)
}
}

}

module.exports = { serialize }
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(chalk.white(chalk.bgRedBright(` Update '${__filename}' `)));
delete require.cache[file];
require(file)
});