import { readFileSync } from "fs";

const input = readFileSync("inputs/day03.txt", "utf-8").trim();

function part1(input: string) {
  return input
    .split("\n")
    .map((bank) => Array.from(bank).map(Number))
    .map((bank) => {
      const lmax = Math.max(...bank.slice(0, bank.length - 1));
      const lidx = bank.indexOf(lmax);
      const rmax = Math.max(...bank.slice(lidx + 1, bank.length));
      return Number(`${lmax}${rmax}`);
    })
    .reduce((sum, num) => sum + num, 0);
}

function part2(input: string) {
  return input
    .split("\n")
    .map((bank) => Array.from(bank).map(Number))
    .map((bank) => {
      let i = 0;
      return Array.from({ length: 12 }, (_, n) => {
        const max = Math.max(...bank.slice(i, bank.length - (12 - n) + 1));
        i = bank.indexOf(max, i) + 1;
        return max;
      });
    })
    .map((enabled) => Number(enabled.join("")))
    .reduce((sum, num) => sum + num, 0);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
