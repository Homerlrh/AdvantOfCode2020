const fs = require("fs");

const info = fs
	.readFileSync("text.txt", { encoding: "utf-8" })
	.split("\r\n")
	.filter((x) => x);

let valid = 0;

const p1 = () => {
	info.forEach((line) => {
		const {
			groups,
		} = /^(?<from>\d+)-(?<to>\d+) (?<char>.): (?<password>.*)$/.exec(line);

		const count = {};

		[...groups.password].forEach((char) => {
			if (!count[char]) {
				count[char] = 0;
			}
			count[char]++;
		});

		if (groups.from <= count[groups.char] && count[groups.char] <= groups.to) {
			valid++;
		}
	});

	console.log(valid);
};

const p2 = () => {
	info.forEach((line) => {
		const {
			groups,
		} = /^(?<from>\d+)-(?<to>\d+) (?<char>.): (?<password>.*)$/.exec(line);

		if (
			(groups.password[groups.from - 1] == groups.char) ^
			(groups.password[groups.to - 1] == groups.char)
		) {
			valid++;
		}
	});
	console.log(valid);
};
