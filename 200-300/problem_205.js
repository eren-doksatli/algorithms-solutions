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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s) {
  let freq = new Map();

  for (let char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  let countMap = new Map();
  for (let count of freq.values()) {
    countMap.set(count, (countMap.get(count) || 0) + 1);
  }

  if (countMap.size === 1) return "YES";
  if (countMap.size > 2) return "NO";

  let [freq1, count1] = [...countMap.entries()][0];
  let [freq2, count2] = [...countMap.entries()][1];

  if (
    (count1 === 1 && (freq1 - 1 === freq2 || freq1 - 1 === 0)) ||
    (count2 === 1 && (freq2 - 1 === freq1 || freq2 - 1 === 0))
  ) {
    return "YES";
  }

  return "NO";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = isValid(s);

  ws.write(result + "\n");

  ws.end();
}
