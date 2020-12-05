const fs = require("fs");

const info = fs
	.readFileSync("text.txt", { encoding: "utf-8" })
	.split("\n")
	.filter((x) => x);

class Map {
	constructor(map) {
		this.map = map;
	}

	getPostition(x, y) {
		return this.map[y][x % this.map[0].length];
	}

	getHeight() {
		return this.map.length;
	}
}

const map = new Map(info.map((line) => [...line]));

const checkTree = (a, b) => {
	let x = 0;
	let y = 0;
	let trees = 0;

	while (y < map.getHeight()) {
		const currtent = map.getPostition(x, y);
		if (currtent == "#") trees++;
		y += b;
		x += a;
	}
	return trees;
};

const part1 = () => {
	console.log(checkTree(3, 1));
};

const b = [
	{ x: 1, y: 1 },
	{ x: 3, y: 1 },
	{ x: 5, y: 1 },
	{ x: 7, y: 1 },
	{ x: 1, y: 2 },
];

const part2 = () => {
	let result = 1;

	for (const i of b) {
		result *= checkTree(i.x, i.y);
	}

	console.log(result);
};

part2();
