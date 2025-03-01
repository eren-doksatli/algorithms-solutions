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
 * Complete the 'maximumPeople' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER_ARRAY p
 *  2. LONG_INTEGER_ARRAY x
 *  3. LONG_INTEGER_ARRAY y
 *  4. LONG_INTEGER_ARRAY r
 */

function maximumPeople(p, x, y, r) {
  const n = p.length;
  const m = y.length;

  function isSunny(personIndex, cloudIndex) {
    return (
      Math.pow(x[personIndex] - y[cloudIndex], 2) + Math.pow(0 - 0, 2) >
      Math.pow(r[cloudIndex], 2)
    );
  }

  function calculateSunnyPeople(removedCloudIndex) {
    let sunnyPeople = 0;
    for (let i = 0; i < n; i++) {
      let personSunny = true;
      for (let j = 0; j < m; j++) {
        if (j !== removedCloudIndex && !isSunny(i, j)) {
          personSunny = false;
          break;
        }
      }
      if (personSunny) {
        sunnyPeople += p[i];
      }
    }
    return sunnyPeople;
  }

  let maxSunnyPeople = 0;
  for (let i = 0; i < m; i++) {
    maxSunnyPeople = Math.max(maxSunnyPeople, calculateSunnyPeople(i));
  }

  return maxSunnyPeople;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const p = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((pTemp) => parseInt(pTemp, 10));

  const x = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((xTemp) => parseInt(xTemp, 10));

  const m = parseInt(readLine().trim(), 10);

  const y = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((yTemp) => parseInt(yTemp, 10));

  const r = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((rTemp) => parseInt(rTemp, 10));

  const result = maximumPeople(p, x, y, r);

  ws.write(result + "\n");

  ws.end();
}
