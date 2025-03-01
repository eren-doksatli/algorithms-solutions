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
 * Complete the 'countSort' function below.
 *
 * The function accepts 2D_STRING_ARRAY arr as parameter.
 */

function countSort(arr) {
  let n = arr.length;
  let buckets = Array.from({ length: 100 }, () => []);

  for (let i = 0; i < n; i++) {
    let index = parseInt(arr[i][0], 10);
    let value = i < n / 2 ? "-" : arr[i][1];
    buckets[index].push(value);
  }

  console.log(buckets.flat().join(" "));
}

function main() {
  const n = parseInt(readLine().trim(), 10);

  let arr = Array(n);

  for (let i = 0; i < n; i++) {
    arr[i] = readLine().replace(/\s+$/g, "").split(" ");
  }

  countSort(arr);
}
