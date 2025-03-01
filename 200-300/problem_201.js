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

/*
 * Complete the 'almostSorted' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function almostSorted(arr) {
  let sortedArr = [...arr].sort((a, b) => a - b);
  let diffIndices = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== sortedArr[i]) {
      diffIndices.push(i);
    }
  }

  if (diffIndices.length === 0) {
    console.log("yes");
    return;
  }

  if (diffIndices.length === 2) {
    console.log("yes");
    console.log(`swap ${diffIndices[0] + 1} ${diffIndices[1] + 1}`);
    return;
  }

  let left = diffIndices[0],
    right = diffIndices[diffIndices.length - 1];
  let reversedSubarray = arr.slice(left, right + 1).reverse();

  if (reversedSubarray.every((val, idx) => val === sortedArr[left + idx])) {
    console.log("yes");
    console.log(`reverse ${left + 1} ${right + 1}`);
    return;
  }

  console.log("no");
}

function main() {
  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  almostSorted(arr);
}
