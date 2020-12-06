const fs = require("fs");

const info = fs
	.readFileSync("text.txt", { encoding: "utf-8" })
	.split("\n\n")
	.filter((x) => x);

const CommonCharacters = (str1, str2) => {
	const strArr1 = Array.from(new Set([...str1]));
	const strArr2 = Array.from(new Set([...str2]));

	let arr = strArr1.filter(function (d, ix) {
		return strArr2.indexOf(d) != -1;
	});

	return arr;
};

const p1 = info
	.map((x) => x.replace(/\n/g, "").split(""))
	.map((x) => new Set(x).size)
	.reduce((a, b) => a + b);

const p2 = info
	.map((x) => x.split("\n"))
	.map((x) => {
		if (x.length == 1) {
			return x[0].length;
		} else {
			const commonLetter = x.reduce((i, j) => CommonCharacters(i, j));
			if (commonLetter.length == 0) {
				return 0;
			} else {
				return commonLetter.length;
			}
		}
	})
	.reduce((a, b) => a + b);

console.log(p1, p2);
