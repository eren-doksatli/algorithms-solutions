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
 * Complete the 'nimGame' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY pile as parameter.
 */

function nimGame(pile) {
  return pile.reduce((acc, num) => acc ^ num, 0) !== 0 ? "First" : "Second";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const g = parseInt(readLine().trim(), 10);

  for (let gItr = 0; gItr < g; gItr++) {
    const n = parseInt(readLine().trim(), 10);

    const pile = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((pileTemp) => parseInt(pileTemp, 10));

    const result = nimGame(pile);

    ws.write(result + "\n");
  }

  ws.end();
}
