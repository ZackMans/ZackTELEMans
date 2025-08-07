module.exports = {
name: ["ai","aichat","openai"],
param: "<query>",
cmd: ["ai","aichatgpt","aichat","openai"],
category: "media",
query: true,
limit: true,
async handler(m, { ctx, q }) {
let chJson = await betabotz.openai(q)
if (chJson.result.length < 4096) {
ctx.reply(`${chJson.result.replaceAll("Lann", "ZackMans").replaceAll("BetaBotz-Ai", "ZackBotMans-Ai")}`, { parse_mode: "Markdown" })
} else if (chJson.result.length >= 4096) {
splitString(ctx, `${chJson.result.replaceAll("Lann", "ZackMans").replaceAll("BetaBotz-Ai", "ZackBotMans-Ai")}`)
}
}}