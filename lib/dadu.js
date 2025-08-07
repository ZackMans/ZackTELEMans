const dadu = async(ctx) => {
	return new Promise(async(resolve, reject) => {
		const dice = [3,1,5,2,6,4]
		const unicode = "🎲"
		let result = await Math.floor(Math.random() * 6) + 1
		ctx.reply("Sedang mengocok dadu..").then(async(data) => {
			for (let i = 0; i < dice.length; i++) {
				await ctx.telegram.editMessageText(data.chat.id, data.message_id, data.message_id, unicode.repeat(dice[i])).then(async() => {
					if (i < 5) return
					if (dice[5] !== result) ctx.telegram.editMessageText(data.chat.id, data.message_id, data.message_id, unicode.repeat(result))
					await tool.sleep(2000)
					ctx.telegram.editMessageText(data.chat.id, data.message_id, data.message_id, "Kamu mendapatkan angka " + result + " setelah mengocok dadu")
				})
			}
		})
		resolve({ author: "ZackMans", result })
	})
}

module.exports = { dadu }