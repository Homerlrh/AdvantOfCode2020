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

let memo = {};
const p2 = (array) => {
	let comb = 1;
	if (array in memo) {
		return memo[array];
	}
	for (let i = 1; i < array.length - 1; i++) {
		if (array[i + 1] - array[i - 1] <= 3) {
			const arr2 = [array[i - 1], ...array.slice(i + 1)];
			comb += p2(arr2);
		}
	}
	memo[array] = comb;
	return comb;
};

console.log(p2(info));
