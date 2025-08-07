module.exports = {
name: ["npmstalk"],
param: "<query>",
cmd: ["npmstalk"],
category: "stalking",
query: true,
limit: true,
async handler(m, { ctx, q, command }) {
await ctx.reply(response.wait)
let a = await tool.fetchJson(`https://registry.npmjs.com/${q}`)
let iA = a.time[a['dist-tags'].latest]
let iN = a.versions[a['dist-tags'].latest]
teks = `
            <b>「 NPM STALKING 」</b>

▸ Author : ${iN['_npmUser'].name}
▸ Email : ${iN['_npmUser'].email}
▸ Name : ${iN.name}
▸ Version : ${iN.version}
▸ Maintainers : ${iN.maintainers.find(v => v).name}

<b>Description</b>
${iN.description}

<b>Keywords</b>
${iN.keywords}

<b>Repository</b>
${iN.repository.url}

<b>Last Publish</b>
${iA}
`
splitString(ctx, teks, { parse_mode: "HTML" })
}}