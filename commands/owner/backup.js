const {execSync} = require('child_process')
const fs = require('fs')
module.exports = {
    name: 'backup',
    cmd: ['backup'],
    category: 'owner',
    owner: true,
    async handler(m, {ctx}){
        await ctx.reply(response.wait)
        const ls = (await execSync('ls')).toString().split('\n').filter(pe => pe != 'node_modules' && pe != 'package-lock.json' && pe != 'Dockerfile' && pe != 'temp' && pe != '')
        const exec = await execSync(`zip -r backup_bot.zip ${ls.join(' ')}`)
        await ctx.replyWithDocument({ source: './backup_bot.zip' })
        await execSync('rm -rf backup_bot.zip')
    }
}