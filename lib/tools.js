const chalk = require("chalk");
const axios = require("axios");
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const FormData = require("form-data");
const fs = require("fs");
const cheerio = require("cheerio");
const { fromBuffer } = require("file-type");
const jimp = require('jimp')

exports.resize = async(buffer, ukur1, ukur2) => {
try{
	const readbuf = await jimp.read(buffer);
	const buff = await readbuf.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
	return(buff)
}catch(e){
	return(String(e))
}
}

exports.fetchJson = (url, options) => new Promise(async(resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})

exports.color = (text, color) => {
	return !color ? chalk.green(text) : chalk.keyword(color)(text);
};
exports.randomobj = (array) => {
	return array[Math.floor(Math.random() * array.length)];
};
exports.getAdmin = async (conn, msg) => {
	var nganu = await conn.groupMetadata(msg.from);
	a = [];
	for (let i of nganu.participants) {
		if (i.admin == null) continue;
		a.push(i.id);
	}
	return a;
};

exports.isUrl = (url) => {
	return url.match(
		new RegExp(
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
			"gi"
		)
	);
};

const kapitalisasiKata = async (str) => {
	return str.replace(/\w\S*/g, function (kata) {
		const kataBaru = kata.slice(0, 1).toUpperCase() + kata.substr(1);
		return kataBaru;
	});
};
exports.webp2mp4 = async (source) => {
	let form = new FormData();
	let isUrl = typeof source === "string" && /https?:\/\//.test(source);
	form.append("new-image-url", isUrl ? source : "");
	form.append("new-image", isUrl ? "" : source, "image.webp");
	let res = await fetch("https://ezgif.com/webp-to-mp4", {
		method: "POST",
		body: form,
	});
	let html = await res.text();
	let { document } = new JSDOM(html).window;
	let form2 = new FormData();
	let obj = {};
	for (let input of document.querySelectorAll("form input[name]")) {
		obj[input.name] = input.value;
		form2.append(input.name, input.value);
	}
	let res2 = await fetch("https://ezgif.com/webp-to-mp4/" + obj.file, {
		method: "POST",
		body: form2,
	});
	let html2 = await res2.text();
	let { document: document2 } = new JSDOM(html2).window;
	return new URL(
		document2.querySelector("div#output > p.outfile > video > source").src,
		res2.url
	).toString();
};
exports.sleep = async (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.formatRupiah = async (angka, prefix) => {
	var number_string = angka.replace(/[^,\d]/g, "").toString(),
		split = number_string.split(","),
		sisa = split[0].length % 3,
		rupiah = split[0].substr(0, sisa),
		ribuan = split[0].substr(sisa).match(/\d{3}/gi);

	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if (ribuan) {
		const separator = sisa ? "." : "";
		rupiah += separator + ribuan.join(".");
	}

	rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
	return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
};
exports.parseResult = async (title, json, option) => {
	if (Array.isArray(json)) {
		var txt = `${title ? `_*${title}*_\n\n` : ''}${global.shp}\n`;
		for (let i = 0; i < json.length; i++) {
			if (option && option.delete) {
				for (let j of option.delete) {
					delete json[i][j];
				}
			}
			for (let j of Object.entries(json[i])) {
				if (j[1] != undefined && j[1] != null && j[1] != "") {
					txt += `${global.shp} *${await kapitalisasiKata(
						j[0].replace(/_/, " ")
					)}* : ${j[1]}\n`;
				}
			}
			if (i + 1 != json.length) txt += `\n${global.shp}\n`;
		}
		//txt += `\n⬢ _*${config.botname}*_`;
	} else {
		var txt = title ? `_*${title}*_\n\n` : '';
		if (option && option.delete) {
			for (let j of option.delete) {
				delete json[j];
			}
		}
		for (let i of Object.entries(json)) {
			if (i[1] != undefined && i[1] != null && i[1] != "") {
				txt += `${global.shp} *${await kapitalisasiKata(
					i[0].replace(/_/, " ")
				)}* : ${i[1]}\n`;
			}
		}
		//txt += `\n⬢ _*${config.botname}*_`;
	}
	return txt.trim();
};
exports.toTimer = (seconds) => {
	function pad(s) {
		return (s < 10 ? "0" : "") + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor((seconds % (60 * 60)) / 60);
	var seconds = Math.floor(seconds % 60);

	//return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
	return `${pad(hours)} Jam - ${pad(minutes)} Menit - ${pad(seconds)} Detik`;
};
exports.kapitalisasiKata = async (str) => {
	return str.replace(/\w\S*/g, function (kata) {
		const kataBaru = kata.slice(0, 1).toUpperCase() + kata.substr(1);
		return kataBaru;
	});
};
exports.tiny = async (link) => {
	return new Promise((resolve) => {
		axios.get(`https://tinyurl.com/api-create.php?url=${link}`).then((res) => {
			resolve(res.data);
		});
	});
};
exports.getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext ? ext : ""}`;
};
exports.ugu = async (buffer) => {
    return new Promise((resolve, reject) => {
        fromBuffer(buffer).then((cek_file) => {
			nama = Date.now()
			if(cek_file == undefined) return resolve({status: false})
            fs.writeFileSync(`./temp/${nama}.${cek_file.ext}`, buffer);
            const bodyForm = new FormData();
            bodyForm.append(
                "files[]",
                fs.createReadStream(`./temp/${nama}.${cek_file.ext}`)
            );
			//
            axios(`https://uguu.se/upload.php`, {
                method: "POST",
                data: bodyForm,
                headers: Object.assign({ "accept": "*/*", "accept-language": "en-US,en;q=0.9,id;q=0.8" }, bodyForm.getHeaders())
            }).then(respon => {
                const result = {
                    status: respon.data.success ? 200 : 404,
                    result: {
                        nama: respon.data.files[0].name,
                        url: respon.data.files[0].url,
                        size: respon.data.files[0].size,
                        hash: respon.data.files[0].hash
                    }
                };
				fs.unlinkSync(`./temp/${nama}.${cek_file.ext}`)
                resolve(result);
            });
        });
    });
};
exports.telegraph = async (buffer) => {
	const { ext } = await fromBuffer(buffer);
	let form = new FormData();
	form.append("file", buffer, "tmp." + ext);
	let res = await fetch("https://telegra.ph/upload", {
		method: "POST",
		body: form,
	});
	let img = await res.json();
	if (img.error) throw img.error;
	return "https://telegra.ph" + img[0].src;
};
exports.getBuffer = async (url, options) => {
	try {
		options ? options : {};
		const res = await axios({
			method: "get",
			url,
			headers: {
				DNT: 1,
				"Upgrade-Insecure-Request": 1,
			},
			...options,
			responseType: "arraybuffer",
		});
		return res.data;
	} catch (e) {
		throw new Error(e);
	}
};

exports.splitString = async(str, maxChunkSize) => {
  const chunks = [];
  for (let i = 0; i < str.length; i += maxChunkSize) {
    chunks.push(str.slice(i, i + maxChunkSize));
  }
  return chunks;
}

exports.typoDetect = (word, dictionary) => {
  let suggestion = '';
  let accuracy = 0;
  
  for (let i = 0; i < dictionary.length; i++) {
    const d = dictionary[i];
    const lev = levenshteinDistance(word, d);
    const acc = 1 - lev / Math.max(word.length, d.length);
    
    if (acc > accuracy) {
      suggestion = d;
      accuracy = acc;
    }
  }
  
  return { suggestion, accuracy };
}

function levenshteinDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = [];
  
  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }
  
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1
        );
      }
    }
  }
  
  return dp[m][n];
}

exports.uuid = () => {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

exports.isUuid = (uuid) => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(uuid);
}