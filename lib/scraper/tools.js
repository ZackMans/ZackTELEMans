const axios = require("axios");
const cheerio = require("cheerio");

async function styletext(teks) {
return new Promise((resolve, reject) => {
axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
.then(({ data }) => {
let $ = cheerio.load(data)
let hasil = []
$('table > tbody > tr').each(function (a, b) {
var name = $(b).find('td:nth-child(1) > span').text()
var il = 1;
hasil.push({ name: hasil.find(v => v.name == name) ? (name.replaceAll(" ", "_") + `_${il++}`) : name.replaceAll(" ", "_"), result: $(b).find('td:nth-child(2)').text().trim() })
})
resolve({ author, data: hasil })
})
})
}

module.exports = { styletext }