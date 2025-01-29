function bomberMan(n, grid) {
  if (n === 1) return grid;
  if (n % 2 === 0) return Array(grid.length).fill("O".repeat(grid[0].length));

  function detonate(grid) {
    let newGrid = Array(grid.length)
      .fill()
      .map(() => "O".repeat(grid[0].length).split(""));
    let directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "O") {
          newGrid[i][j] = ".";
          for (let [dx, dy] of directions) {
            let ni = i + dx,
              nj = j + dy;
            if (ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[0].length) {
              newGrid[ni][nj] = ".";
            }
          }
        }
      }
    }
    return newGrid.map((row) => row.join(""));
  }

  let gridAfterFirstDetonation = detonate(grid);
  let gridAfterSecondDetonation = detonate(gridAfterFirstDetonation);

  return n % 4 === 3 ? gridAfterFirstDetonation : gridAfterSecondDetonation;
}
