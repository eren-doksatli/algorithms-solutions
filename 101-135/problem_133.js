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
 * Complete the 'happyLadybugs' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING b as parameter.
 */

function happyLadybugs(b) {
  let count = {};
  let hasEmpty = false;

  for (let char of b) {
    if (char === "_") {
      hasEmpty = true;
    } else {
      count[char] = (count[char] || 0) + 1;
    }
  }

  if (Object.values(count).some((val) => val === 1)) {
    return "NO";
  }

  if (!hasEmpty) {
    for (let i = 1; i < b.length - 1; i++) {
      if (b[i] !== b[i - 1] && b[i] !== b[i + 1]) {
        return "NO";
      }
    }
  }

  return "YES";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const g = parseInt(readLine().trim(), 10);

  for (let gItr = 0; gItr < g; gItr++) {
    const n = parseInt(readLine().trim(), 10);

    const b = readLine();

    const result = happyLadybugs(b);

    ws.write(result + "\n");
  }

  ws.end();
}
