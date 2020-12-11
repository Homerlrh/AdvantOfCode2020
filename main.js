const fs = require("fs");

const info = fs
	.readFileSync("text.txt", { encoding: "utf-8" })
	.split("\n")
	.map(Number);

info.push(0);
info.push(Math.max(...info) + 3);

let newInfo = info.sort(function (a, b) {
	return a - b;
});

const p1 = () => {
	let l = 0;
	const jolt = { 1: 0, 2: 0, 3: 0 };
	for (const i of newInfo) {
		const diff = i - l;
		jolt[diff]++;
		l = i;
	}
	return jolt[3] * jolt[1];
};

//console.log(p1());
console.log(info);
