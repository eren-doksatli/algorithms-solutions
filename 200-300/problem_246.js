"use strict";

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

function calculateHealth(genes, health, first, last, d) {
  let totalHealth = 0;
  for (let i = first; i <= last; i++) {
    const gene = genes[i];
    const geneLength = gene.length;
    for (let j = 0; j <= d.length - geneLength; j++) {
      if (d.substring(j, j + geneLength) === gene) {
        totalHealth += health[i];
      }
    }
  }
  return totalHealth;
}

function main() {
  const n = parseInt(readLine().trim(), 10);

  const genes = readLine().replace(/\s+$/g, "").split(" ");

  const health = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((healthTemp) => parseInt(healthTemp, 10));

  const s = parseInt(readLine().trim(), 10);

  let minHealth = Infinity;
  let maxHealth = -Infinity;

  for (let sItr = 0; sItr < s; sItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const first = parseInt(firstMultipleInput[0], 10);

    const last = parseInt(firstMultipleInput[1], 10);

    const d = firstMultipleInput[2];

    const currentHealth = calculateHealth(genes, health, first, last, d);
    minHealth = Math.min(minHealth, currentHealth);
    maxHealth = Math.max(maxHealth, currentHealth);
  }

  console.log(minHealth + " " + maxHealth);
}
