const fs = require("fs");

const info = fs
	.readFileSync("text.txt", { encoding: "utf-8" })
	.split("\n")
	.map(Number);

let preamble = 25;

const p1 = (from, to, ind) => {
	let actual = info[ind];
	let poss = info.slice(from, to);
	let found = false;
	for (let i = 0; i < poss.length; i++) {
		for (let j = 0; j < poss.length; j++) {
			if (poss[i] + poss[j] == actual) {
				found = true;
				break;
			}
		}
	}
	return found ? p1(from + 1, to + 1, ind + 1) : actual;
};

let l = -1;
const hitValue = p1(0, preamble, preamble);

const p2 = () => {
	for (let i = 0; i < info.length; i++) {
		l++;
		for (let j = 3; j < info.length - 3; j++) {
			let z = info.slice(i, l + j);
			let sumOfThree = z.reduce((a, b) => a + b);
			if (sumOfThree == hitValue) {
				return Math.min(...z) + Math.max(...z);
			} else if (sumOfThree > hitValue) {
				j = info.length;
			}
		}
	}
};

console.log("p1", hitValue);
console.log("p2", p2());
