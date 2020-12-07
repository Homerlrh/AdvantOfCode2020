const fs = require("fs");

const info = fs.readFileSync("text.txt", { encoding: "utf-8" }).split("\n");

const p1 = () => {
	const obj = {};

	info.forEach((x) => {
		const [a, bag, contain] = /(\w+ \w+) bags contain (.*)\./.exec(x);
		const containBag =
			contain !== "no other bags"
				? contain.split(", ").map((other) => /(\w+ \w+) bags?/.exec(other)[1])
				: [];

		obj[bag] = new Set(containBag);
	});

	const insertColor = (bag) => {
		let colors = [...obj[bag]];
		for (const color of [...obj[bag]]) {
			colors = [...colors, ...insertColor(color)];
		}
		return colors;
	};
	return Object.keys(obj)
		.map((x) => insertColor(x))
		.filter((x) => x.includes("shiny gold")).length;
};

const p2 = () => {
	const obj = {};

	info.forEach((x) => {
		const [a, bag, contain] = /(\w+ \w+) bags contain (.*)\./.exec(x);
		const containBag =
			contain !== "no other bags"
				? contain.split(", ").map((other) => {
						const [, units, color] = /(\d+) (\w+ \w+) bags?/.exec(other);
						return { units: parseInt(units), color };
				  })
				: [];
		obj[bag] = new Set(containBag);
	});

	const b = new Map();
	for (const i in obj) {
		b.set(i, [...obj[i]]);
	}
	const calBag = (bag) => {
		let total = 0;
		for (const { color, units } of b.get(bag)) {
			total += units + units * calBag(color);
		}
		return total;
	};

	return calBag("shiny gold");
};

console.log(p1(), p2());
