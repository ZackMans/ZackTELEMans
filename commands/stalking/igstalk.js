module.exports = {
name: ["instagramstalk","igstalk"],
param: "<query>",
cmd: ["instagramstalk","igstalk"],
category: "stalking",
query: true,
limit: true,
async handler(m, { ctx, q, command }) {
await ctx.reply(response.wait)
let igSt = await scraper.instagram.stalk(q)
teks = `
       <b>Profile User</b>

▸ <b>Name:</b> ${igSt.user.full_name === "" ? "-" : igSt.user.full_name}
▸ <b>Username:</b> ${igSt.user.username}
▸ <b>Followers:</b> ${igSt.user.edge_followed_by.count} followers
▸ <b>Following:</b> ${igSt.user.edge_follow.count} following
▸ <b>Posting:</b> ${igSt.user.edge_owner_to_timeline_media.count} postingan
 
<b>Biography</b>
${igSt.user.biography}
${igSt.user.external_url}

<b>Account Info</b>
Private : ${igSt.user.is_private}
Verified : ${igSt.user.is_verified}
Fb Connect : ${igSt.user.connected_fb_page}
`

ctx.replyWithPhoto({ url: igSt.user.profile_pic_url_hd }, { parse_mode: "HTML", caption: teks })
}}