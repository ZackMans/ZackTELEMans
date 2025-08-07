const cheerio = require("cheerio");
const fetch = require("node-fetch");
const axios = require("axios");
const got = require("got");
const request = require("request");
const encodeUrl = require("encodeurl");
const FormData = require("form-data");
const url = require("url");
const { fromBuffer } = require("file-type");
const fs = require("fs");
const mime = require("mime");
const { JSDOM } = require("jsdom");

const error = {
    link: {
        status: false,
        message: "Link tidak valid!"
    }
}

exports.pinterest = async(querry) => {     
  return new Promise(async(resolve,reject) => {     
    axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {     
      headers: {     
"cookie" : "_auth=1; _pinterest_sess=TWc9PSZpWDRJOE9VZHZ3Q2hiblN4UnhNay9UbHVTc0poVU9mdy90MDMrcFJmaHNtV0dzSVhRamhUOXpINFl1UE5zckprai9ORktBMlV1eStIVlM4NGhoMFlNYUs2V1hDc0R6SVllclp1cllVQ0pSOXJFU29WelA1bkJPWStNT0pZUXZUMUpDbTRleWJDa1Jiakx4OG5YNEdhRE9hNDNqMGlKZ0lkb3dPZkRYbzZ4RlF3Vm01eThxNDBwUDEwOTQ0ZVU1RDV0WnNCMzNwYjU2NFlkZ0kwNjFXTGU1SnNKUi9IY1VmczJwd1l6SHppbktTVDhraEFGd0g1ZVVRNDUzRmY1aGRhdUlDVEN4alBsRGhlMEUwOWw2MmF6bld6eVBiVU5Ycjh2eXlycE1FK295RitOUmhBRHo5aDRldG1pcjdRU2hzdFVtV2t4RitrT3JjdllIbGl5Y3hkUHE5OENySDNkYjNOc0VpWkhtdnlFM2x3bTZVZ2FrdVlnK090OU9OSldEN1BZZEYwT3NjQ3JyaTFIRWQrSFlFZFhmMXAzbVR2VjczYUpTYWowTU83UlhYTVpWNVZhYmk1RGRVSEErVm9BbzQwRzRYeTNiWG1HZFJuTTJkbnlBNTJhQkhPMitOK0NKN0ZWTHprcGlmakd5Ui9hcU1qbEVaQlRnNVRGbEJwdExQVFR4MDlWb0hWUSthYVJQK0hyMStUenc0YkdiUW1HcnBjdTluWk1ZVEZpbU1hbEcrMjFoSlpHeElaTmo4N2hNRjJKcnMwK3N4Q1U4d3BMbklsUXIrT3VQMHBacjZRZVI4SWxiZWdQcFJMVWN3ejFjZmpZb2xwSGNXaWwzeVAxYlRETkFWV3NpVnVZOTdpeDhnTGpjR2FkRGkrWmNZQ3NWZzdseGlvVTdVdEFBSnhSWndDeVFyY3o5WUI3ek9oTzExKyttdnkzYkx5cFhsOXYwc0d3QU1rbkNrWEFvWm9uM1ZESjBkTUJDTTZXSzlvUEVQSHVoSTZ6MVRCV2x3Q3FMK3BKU09zZ0VJL1drUVM2dTVSZWtIMkRQa3NUdEltdkYxSDJpb1k3ems3eTE2ZDNJMGtiaUFFR2J1VkcyTE9BdnZLN09rZmM4RStNTy9UUEV2RHVWSGRwcUlkYkxCakxwV1VINFh2ZXZzd3hNbURjbzZxeEJLc2ZRUDN3NUVkamZyd1ZhUnhEZzVIak5wOUhKZVp6TWlIVjJoNlR6UXdUZGtUY0N4SUZFVW5XVmF6cmhaUUxDbVRGbDJwTjdHTDJKUldNdUJFeExGVVVTU2ZlU3MyV0QwczFLbHd4L1VibXRReDNNdHVUZkRtUzc3bzRjcnlySGE3eURNY2V0Q25iUkN0Z3E1Ti9UbEpWcHBDdDlhUm9GSXZnTWVJQ3JkZWNtc3pWdzkxVk9JSCtyZEc0Wk1vQU11NGlLdVAyVnJpK1ZNVHpIa3RNS3pVdVNsNWxQZEtLTzYyVGVxaUptMlZvSHVZZCszVUl0Ui84U2cvWTV6blBkTjlndW16b01YSmZKRWEyNFNxWGpVYTFjOGs4SzVITnM1SjNOVVcyUzEzYXBLekxsN3JudlFmdjlhZmNxc09heVUxYTQ4SVM1YnNoWVdVU3Q3V1FHRElRNHlBOTgvWFJ4dlJ6cFQ5ZHNQT0JuckdqZ2pTL0ZJTW8yWW0wV1ZETUo0NXNWZVJGWXVkc1EwUzZsMVpXUStFOTVBZnFGbWJRNUhPTDhYazNGWG9XSkFleHR6cndDSjU5UUprWmdUTHh0MEZWWnZGOFFpL25IRnImS1Y3Q1VDaTNuZTZLQ1dKQUkzZ3c3djdyeXhnPQ==; _ir=0"     
      }     
    }).then(({ data }) => {     
      const $ = cheerio.load(data)     
      const result = [];     
      const hasil = [];     
      $('div > a').get().map(b => {     
        const link = $(b).find('img').attr('src')
        result.push(link)     
      });     
      result.forEach(v => {     
        if(v == undefined) return     
        hasil.push(v.replace(/236/g,'736'))     
      })     
    hasil.shift();     
    resolve(hasil)     
    })     
  })     
}

exports.aiovdl = async(url) => {
    return new Promise(async(resolve, reject) => {
        const gettoken = await axios.get('https://viddownloader.online/pinterest-downloader/')
        const token = cheerio.load(gettoken.data)('#token').attr('value')
        const options = {
            method: 'POST',
            url: 'https://viddownloader.online/wp-json/aio-dl/video-data/',
            headers: {
                "content-type": 'application/json; charset=UTF-8',
                "cookie": 'PHPSESSID=pboq0ag9iikl5fd1ahf1cchs93;'
            },
            formData: {
                url: url,
                token: token
            }
        }
        request(options, async function(error, response, body){
            if(error) return resolve({status: false})
            const data = JSON.parse(body)
            resolve(data.error ? { status: false, ...data } : { status: true, ...data })
        })
    })
}

exports.mediafire = async(url) => {
    try{
        const {data} = await axios.get(url)
        const $ = cheerio.load(data)
        const result = {
            filename: $("div.dl-btn-label").attr("title"),
            filesize: $("a#downloadButton").text().split("(")[1].split(")")[0],
            uploadAt: $("ul.details > li:nth-child(2)").text().split(": ")[1],
            mimetype: mime.lookup($("a#downloadButton").attr("href")),
            ext: $("a#downloadButton").attr("href").replace(/^.*[\.\/\\]/, ""),
            filetype: $("div.filetype").text(),
            link: $("a#downloadButton").attr("href")
        }
        return({ status: true, ...result })
    }catch{
        return({ status: false, message: 'error' })
    }
}

exports.ghuser = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            var response = await axios.get(`https://api.github.com/users/${user}`);
        } catch {
            return resolve({
                status: false,
                message: "User not found",
            });
        }
        if (response.status == 200) {
            const results = response.data;
            data = {};
            data.code = response.status;
            (data.status = true),
            (data.user = {
                idUser: results.id,
                username: results.login,
                nodeId: results.node_id,
                avatarUrl: results.avatar_url,
                gravatarId: results.gravatar_id == "" ? null : results.gravatar_id,
                githubUrl: results.html_url,
                type: results.type,
                isSiteAdmin: results.site_admin,
                name: results.name,
                company: results.company,
                blog: results.blog,
                email: results.email,
                hireable: results.hireable,
                bio: results.bio,
                twitterUsername: results.twitter_username,
                location: results.location,
                publicRepos: results.public_repos,
                publicGists: results.public_gists,
                followers: results.followers,
                following: results.following,
                createdAt: results.created_at,
                updatedAt: results.updated_at,
            });
            data.creator = author
            resolve(data);
        } else {
            resolve({
                code: 500,
                status: false,
                success: false,
                message: "Server Bermasalah",
            });
        }
    });
};

exports.ghrepo = async (repo) => {
    return new Promise(async (resolve, reject) => {
        await axios
            .get(`https://api.github.com/search/repositories?q=${repo}`)
            .then((response) => {
                if (response.status == 200) {
                    const results = response.data.items;

                    data = {};
                    data.code = response.status;
                    data.message = "ok";
                    data.totalCount = response.data.total_count;
                    data.items = [];
                    data.creator = author

                    if (data.totalCount != 0) {
                        results.forEach((res) => {
                            data.items.push({
                                id: res.id,
                                nodeId: res.node_id,
                                nameRepo: res.name,
                                fullNameRepo: res.full_name,
                                url_repo: res.html_url,
                                description: res.description,
                                git_url: res.git_url,
                                ssh_url: res.ssh_url,
                                clone_url: res.clone_url,
                                svn_url: res.svn_url,
                                homepage: res.homepage,
                                stargazers: res.stargazers_count,
                                watchers: res.watchers,
                                forks: res.forks,
                                defaultBranch: res.default_branch,
                                language: res.language,
                                isPrivate: res.private,
                                isFork: res.fork,
                                createdAt: res.created_at,
                                updatedAt: res.updated_at,
                                pushedAt: res.pushed_at,
                                author: {
                                    username: res.owner.login,
                                    id_user: res.owner.id,
                                    avatar_url: res.owner.avatar_url,
                                    user_github_url: res.owner.html_url,
                                    type: res.owner.type,
                                    isSiteAdmin: res.owner.site_admin,
                                },
                            });
                        });
                    } else {
                        data.items = "Repositories not found";
                    }

                    resolve(data);
                } else {
                    reject({
                        code: 500,
                        success: false,
                        message: "Server Bermasalah",
                    });
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};