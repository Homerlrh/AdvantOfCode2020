const fs = require("fs");

const info = fs
	.readFileSync("text.txt", { encoding: "utf-8" })
	.split("\n")
	.filter((x) => x);

//whole range 0 ~ 127
//f , R => 0
//B , L=> 1
const checkSeat = (str) => {
	const newStr = str.split("");
	let row = "";
	let column = "";
	for (let i = 0; i < str.length; i++) {
		if (newStr[i] == "F") {
			row += 0;
		} else if (newStr[i] == "B") {
			row += 1;
		} else if (newStr[i] == "R") {
			column += 1;
		} else if (newStr[i] == "L") {
			column += 0;
		}
	}
	const num1 = parseInt(row, 2);
	const num2 = parseInt(column, 2);
	return num1 * 8 + num2;
};

function range(start, end) {
	var ans = [];
	for (let i = start; i <= end; i++) {
		ans.push(i);
	}
	return ans;
}

const IDs = info.map((x) => checkSeat(x));

const p1 = () => {
	console.log(Math.max(...IDs));
};

const p2 = () => {
	//my id is missing
	//beginning and last not exist
	//get the whole sorted list, find the not exist num
	const listOfId = range(Math.min(...IDs), Math.max(...IDs));
	for (let i of listOfId) {
		if (!IDs.includes(i)) {
			console.log(i);
		}
	}
};
