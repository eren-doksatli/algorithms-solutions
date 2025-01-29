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
 * Complete the 'decentNumber' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

function decentNumber(n) {
  let fives = n;

  while (fives % 3 !== 0) {
    fives -= 5;
  }

  if (fives < 0) {
    console.log(-1);
  } else {
    console.log("5".repeat(fives) + "3".repeat(n - fives));
  }
}

function main() {
  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    decentNumber(n);
  }
}
