const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.on("line", (line) => {
	console.log(getResult(line));
});

function getResult(s) {
	let isNegative = false;
	const negative = [];

	let ans = BigInt(0);
	for (let c of s) {
		if (c >= "0" && c <= "9") {
			if (isNegative) {
				negative.push(c);
			} else {
				ans += BigInt(c);
			}
		} else {
			if (isNegative) {
				ans -= BigInt(negative.join(""));
				negative.length = 0;
			}
			isNegative = c === "-";
		}
	}
	if (negative.length > 0) {
		ans -= BigInt(negative.join(""));
	}
	return ans.toString();
}

