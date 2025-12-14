import { readFileSync } from "fs";

const input = readFileSync("inputs/day04.txt", "utf-8").trim();
// const input = `
// ..@@.@@@@.
// @@@.@.@.@@
// @@@@@.@.@@
// @.@@@@..@.
// @@.@@@@.@@
// .@@@@@@@.@
// .@.@.@.@@@
// @.@@@.@@@@
// .@@@@@@@@.
// @.@.@@@.@.
// `.trim();
// console.log(input);

function update(grid: string[][]): string[][] {
  return grid.map((row, r) =>
    row.map((val, c) => {
      if (val === "@") {
        return grid
          .slice(Math.max(r - 1, 0), r + 2)
          .flatMap((row) => row.slice(Math.max(c - 1, 0), c + 2))
          .filter((x) => x === "@").length <= 4
          ? "x"
          : val;
      }
      return val;
    }),
  );
}

function part1(input: string): number {
  const grid = input.split("\n").map((row) => row.split(""));
  return update(grid)
    .flat()
    .filter((x) => x === "x").length;
}

function equals(a: string[][], b: string[][]): boolean {
  return a.every((row, r) => row.every((val, c) => val === b[r]![c]));
}

function part2(input: string): number {
  let grid = input.split("\n").map((row) => row.split(""));
  while (true) {
    const next = update(grid);
    if (equals(grid, next)) break;
    grid = next;
  }
  return grid.flat().filter((x) => x === "x").length;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
