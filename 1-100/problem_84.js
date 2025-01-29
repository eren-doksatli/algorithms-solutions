"use strict";

const fs = require("fs");

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
 * Complete the 'funnyString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function funnyString(s) {
  const n = s.length;
  for (let i = 1; i < n; i++) {
    const forwardDiff = Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1));
    const backwardDiff = Math.abs(
      s.charCodeAt(n - i) - s.charCodeAt(n - i - 1)
    );
    if (forwardDiff !== backwardDiff) {
      return "Not Funny";
    }
  }
  return "Funny";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    const result = funnyString(s);

    ws.write(result + "\n");
  }

  ws.end();
}
