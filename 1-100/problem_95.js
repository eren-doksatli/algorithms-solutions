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
 * Complete the 'makingAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */

function makingAnagrams(s1, s2) {
  const freq = new Array(26).fill(0);
  const base = "a".charCodeAt(0);

  for (let char of s1) {
    freq[char.charCodeAt(0) - base]++;
  }

  for (let char of s2) {
    freq[char.charCodeAt(0) - base]--;
  }

  return freq.reduce((acc, count) => acc + Math.abs(count), 0);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s1 = readLine();

  const s2 = readLine();

  const result = makingAnagrams(s1, s2);

  ws.write(result + "\n");

  ws.end();
}
