module.exports = {
name: ["sendfile"],
param: "<type|url>",
cmd: ["sendfile"],
category: "tools",
query: true,
url: true,
limit: true,
async handler(m, { ctx, q, command, args }) {
ctx.sendFileUrl(args[0])
}}