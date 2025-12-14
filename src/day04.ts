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

function part1(input: string): number {
  const grid = input.split("\n").map((row) => row.split(""));
  return grid
    .flatMap((row, r) =>
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
    )
    .filter((x) => x === "x").length;
}

function part2(input: string): number {
  return 0;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
