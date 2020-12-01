const fs = require("fs");

const info = fs
	.readFileSync("text.txt", { encoding: "utf-8" })
	.split("\n")
	.filter((x) => x)
	.map((x) => parseInt(x));

const part1 = () => {
	for (let i = 0; i < info.length; i++) {
		for (let j = i + 1; j < info.length; j++) {
			if (info[i] + info[j] == 2020) {
				console.log(info[i] * info[j]);
			}
		}
	}
};

const part2 = () => {
	for (let i = 0; i < info.length; i++) {
		for (let j = i + 1; j < info.length; j++) {
			for (let k = j + 1; k < info.length; k++) {
				if (info[i] + info[j] + info[k] == 2020) {
					console.log(info[i] * info[j] * info[k]);
				}
			}
		}
	}
};

part2();
