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
 * Complete the 'anagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function anagram(s) {
  if (s.length % 2 !== 0) return -1;

  const mid = s.length / 2;
  const firstHalf = s.substring(0, mid);
  const secondHalf = s.substring(mid);

  const charCount = new Array(26).fill(0);

  for (const char of firstHalf) {
    charCount[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  for (const char of secondHalf) {
    charCount[char.charCodeAt(0) - "a".charCodeAt(0)]--;
  }

  return charCount.reduce((acc, count) => acc + Math.max(0, count), 0);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    const result = anagram(s);

    ws.write(result + "\n");
  }

  ws.end();
}
