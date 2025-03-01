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
 * Complete the 'shortPalindrome' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function shortPalindrome(s) {
  const MOD = 1000000007;

  let count1 = new Array(26).fill(0);
  let count2 = new Array(26).fill(0).map(() => new Array(26).fill(0));
  let count3 = new Array(26).fill(0);
  let count4 = 0;

  for (let char of s) {
    let index = char.charCodeAt(0) - "a".charCodeAt(0);

    count4 = (count4 + count3[index]) % MOD;

    for (let j = 0; j < 26; j++) {
      count3[j] = (count3[j] + count2[j][index]) % MOD;
    }

    for (let j = 0; j < 26; j++) {
      count2[j][index] = (count2[j][index] + count1[j]) % MOD;
    }

    count1[index] = (count1[index] + 1) % MOD;
  }

  return count4;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = shortPalindrome(s);

  ws.write(result + "\n");

  ws.end();
}
