const fs = require("fs");

const info = fs.readFileSync("text.txt", { encoding: "utf-8" }).split("\r\n");

const p1 = () => {
	const isVisited = [];
	let currentIndex = 0;
	let acc = 0;
	while (!isVisited.includes(currentIndex)) {
		isVisited.push(currentIndex);
		const [k, v] = info[currentIndex].split(" ");
		if (k == "nop") {
			currentIndex++;
		} else {
			const num = parseInt(v);
			if (k == "acc") {
				acc += num;
				currentIndex++;
			} else {
				currentIndex += num;
			}
		}
	}
	console.log(acc);
};

const p2 = () => {
	// just need to change one at a time
	// get all the combo
	const p2Array = info.map((x, i, a) => {
		const array = [...a];
		if (x.includes("nop")) {
			x = x.replace("nop", "jmp");
		} else if (x.includes("jmp")) {
			x = x.replace("jmp", "nop");
		} else {
			x = x;
		}
		array[i] = x;
		return array;
	});

	p2Array.forEach((x) => {
		let isVisited = [];
		let currentIndex = 0;
		let acc = 0;
		while (!isVisited.includes(currentIndex)) {
			isVisited.push(currentIndex);
			const [k, v] = x[currentIndex].split(" ");
			if (k == "nop") {
				currentIndex++;
			} else {
				const num = parseInt(v);
				if (k == "acc") {
					acc += num;
					currentIndex++;
				} else {
					currentIndex += num;
				}
			}
			//get travel from top to bottom
			if (currentIndex == x.length) {
				console.log(acc);
				break;
			}
		}
	});
};

p1();
p2();
