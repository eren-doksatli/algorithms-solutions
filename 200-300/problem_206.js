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
 * Complete the 'sherlockAndAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function sherlockAndAnagrams(s) {
  let count = new Map();
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let substring = s
        .slice(i, j + 1)
        .split("")
        .sort()
        .join("");
      count.set(substring, (count.get(substring) || 0) + 1);
    }
  }

  for (let freq of count.values()) {
    result += (freq * (freq - 1)) / 2;
  }

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    const result = sherlockAndAnagrams(s);

    ws.write(result + "\n");
  }

  ws.end();
}
