
var ut = {
	setting: {
		playerImage: []
		playerMax: 4, // maximum number of players joining
		sessionMax: 2, // maximum session rooms are created in one group
	},
	0: {
		boardImage: "",
		box: {
			max: 50,
			min: 1,
			sl: {}
		}
	},
	1: {
		boardImage: "",
		box: {
			max: 100,
			min: 1
			sl: {
				43: 4,
				50: 5,
				56: 8,
				73: 15,
				84: 58,
				87: 49,
				98: 40,
				2: 25,
				6: 45,
				20: 59,
				52: 72,
				57: 96,
				71: 92
			}
		}
	},
	2: {
		boardImage: "",
		box: {
			max: 150,
			min: 1,
			sl: {}
		}
	},
	3: {
		boardImage: "",
		box: {
			max: 200,
			min: 1,
			sl: {}
		}
	}
}

var session = {
	"1@g.us": [{
		id: "628893078789@s.whatsapp.net", // creator id
		level: 0, // 0 easy, 1 normal, 2 hard, 3 insanade
		players: [{
			id: "6281385062956@s.whatsapp.net",
			color: 0, // 0 red, 1 blue, 2 green, 3 yellow
			box: 100 // road
		},{
			id: "6288293078789@s.whatsapp.net",
			color: 1, // 0 red, 1 blue, 2 green, 3 yellow
			box: 28 // road
		}]
	}]
}
