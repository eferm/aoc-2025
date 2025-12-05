import { readFileSync } from "fs";

const input = readFileSync("inputs/day03.txt", "utf-8").trim();
// const input = `
// 987654321111111
// 811111111111119
// 234234234234278
// 818181911112111
// `.trim();

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
      const arr = [];
      let i = 0;
      for (let n = 0; n < 12; n++) {
        const max = Math.max(...bank.slice(i, bank.length - (12 - n) + 1));
        arr.push(max);
        i = bank.indexOf(max, i) + 1;
      }
      return Number(arr.join(""));
    })
    .reduce((sum, num) => sum + num, 0);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
