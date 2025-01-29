"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'separateNumbers' function below.
 *
 * The function accepts STRING s as parameter.
 */

function separateNumbers(s) {
  let found = false;
  let firstNumber = "";

  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    let start = BigInt(s.substring(0, i));
    firstNumber = start.toString();
    let generatedString = firstNumber;

    while (generatedString.length < s.length) {
      start++;
      generatedString += start.toString();
    }

    if (generatedString === s) {
      found = true;
      break;
    }
  }

  console.log(found ? `YES ${firstNumber}` : "NO");
}

function main() {
  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    separateNumbers(s);
  }
}
