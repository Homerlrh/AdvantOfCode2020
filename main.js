const fs = require("fs");

const info = fs
	.readFileSync("text.txt", { encoding: "utf-8" })
	.split("\n\n")
	.filter((x) => x)
	.map((x) => x.split(/\s+/g))
	.map((x) => {
		let k = {};
		x.map((y) => {
			const z = y.split(":");
			return (k[z[0]] = z[1]);
		});
		return k;
	});

const validOption = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "cid", "hgt"];

const ecl = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);

const findDiffInKey = (a1, a2) => {
	const intersection = a1.filter((element) => !a2.includes(element));
	if (intersection.length > 1) return false;
	if (intersection.length == 0) return true;
	if (intersection.length == 1) {
		if (intersection[0] == "cid") return true;
		else return false;
	}
};

const part1 = () => {
	let isValid = 0;
	info.forEach((x) => {
		const v = Object.keys(x);
		if (findDiffInKey(validOption, v)) {
			isValid++;
		}
	});
	console.log(isValid);
};

const check = (obj) => {
	let isValid = false;

	if (1920 <= obj["byr"] && obj["byr"] <= 2002) isValid = true;
	else return false;

	if (2010 <= obj["iyr"] && obj["iyr"] <= 2020) isValid = true;
	else return false;

	if (2020 <= obj["eyr"] && obj["eyr"] <= 2030) isValid = true;
	else return false;

	if (obj["hgt"].includes("cm") ^ obj["hgt"].includes("in")) {
		if (obj["hgt"].includes("cm") && obj["hgt"] >= 150 && obj["hgt"] <= 193)
			isValid = true;
		if (obj["hgt"].includes("in") && obj["hgt"] >= 59 && obj["hgt"] <= 76)
			isValid = true;
	} else return false;

	if (/^#[0-9a-f]{6}$/.test(obj["hcl"])) isValid = true;
	else return false;

	if (/^\d{9}$/.test(obj["pid"])) isValid = true;
	else return false;

	if (ecl.has(obj["ecl"])) isValid = true;
	else return false;

	return isValid;
};

const part2 = () => {
	let isValid = 0;
	let b = [];
	info.forEach((x) => {
		const v = Object.keys(x);
		if (findDiffInKey(validOption, v)) {
			b = [...b, x];
		}
	});
	console.log(b.length);
	b.forEach((x) => {
		if (check(x)) isValid++;
	});

	console.log(isValid++);
};

part2();

console.log();
