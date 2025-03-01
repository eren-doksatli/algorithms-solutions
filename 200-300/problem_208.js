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
 * Complete the 'steadyGene' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING gene as parameter.
 */

function steadyGene(gene) {
  let n = gene.length;
  let required = n / 4;
  let count = { A: 0, C: 0, G: 0, T: 0 };

  for (let char of gene) {
    count[char]++;
  }

  if (
    count["A"] === required &&
    count["C"] === required &&
    count["G"] === required &&
    count["T"] === required
  ) {
    return 0;
  }

  let minLength = n;
  let left = 0;

  for (let right = 0; right < n; right++) {
    count[gene[right]]--;

    while (
      count["A"] <= required &&
      count["C"] <= required &&
      count["G"] <= required &&
      count["T"] <= required
    ) {
      minLength = Math.min(minLength, right - left + 1);
      count[gene[left]]++;
      left++;
    }
  }

  return minLength;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const gene = readLine();

  const result = steadyGene(gene);

  ws.write(result + "\n");

  ws.end();
}
