const { performance } = require("perf_hooks");
const osu = require("node-os-utils");

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ ms, h, m, s })
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

module.exports = {
name: "status",
cmd: ["status","botstat","botstats","bot","stat","stats"],
category: "information",
async handler(m, { ctx, command }) {
try {
let NotDetect = 'Not Detect'
let old = performance.now()
let cpu = osu.cpu
let cpuCore = cpu.count()
let drive = osu.drive
let mem = osu.mem
let netstat = osu.netstat
let OS = osu.os.platform()
let cpuModel = cpu.model()
let cpuPer
let p1 = cpu.usage().then(cpuPercentage => {
cpuPer = cpuPercentage
}).catch(() => {
cpuPer = NotDetect
})
let driveTotal, driveUsed, drivePer
let p2 = drive.info().then(info => {
driveTotal = (info.totalGb + ' GB'),
driveUsed = info.usedGb,
drivePer = (info.usedPercentage + '%')
}).catch(() => {
driveTotal = NotDetect,
driveUsed = NotDetect,
drivePer = NotDetect
})
let ramTotal, ramUsed
let p3 = mem.info().then(info => {
ramTotal = info.totalMemMb,
ramUsed = info.usedMemMb
}).catch(() => {
ramTotal = NotDetect,
ramUsed = NotDetect
})
let netsIn, netsOut
let p4 = netstat.inOut().then(info => {
netsIn = (info.total.inputMb + ' MB'),
netsOut = (info.total.outputMb + ' MB')
}).catch(() => {
netsIn = NotDetect,
netsOut = NotDetect
})
await Promise.all([p1, p2, p3, p4])
let _ramTotal = (ramTotal + ' MB')
let neww = performance.now()

var txt = `
${gatas} OS : ${OS}
${gtn} CPU Model : ${cpuModel}
${gtn} CPU Core : ${cpuCore} Core
${gtn} CPU : ${cpuPer}%
${gtn} Ram : ${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})
${gtn} Drive : ${driveUsed} / ${driveTotal} (${drivePer})
${gtn} Ping : ${Math.round(neww - old)} ms
${gtn} Internet IN : ${netsIn}
${gbawah} Internet OUT : ${netsOut}
`

ctx.reply(txt)
console.log(OS)
} catch (e) {
console.log(e)
ctx.reply(String(e))
}
}}