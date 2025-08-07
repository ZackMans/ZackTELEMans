module.exports = {
name: "gitclone",
cmd: ["gitclone"],
category: "tools",
desc: "Mengclone Repository In Github",
param: "<url>",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q, args }) {
await ctx.reply(response.wait)
const name = q.split('/')[3]
const repo = q.split('/')[4]
const find = await scraper.media.ghrepo(repo)
const filter = find.items.find(y => y.nameRepo == repo && y.url_repo == text && y.author.username == name)
if(filter == undefined) return ctx.reply('Repository not found')
const downurl = `${text}/archive/refs/heads/${filter.defaultBranch}.zip`
await ctx.replyWithDocument({ url: downurl, contentType: 'application/zip', fileName: filter.fullNameRepo })
},
};
