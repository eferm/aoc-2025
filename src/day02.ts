import { readFileSync } from "fs";

const input = readFileSync("inputs/day02.txt", "utf-8").trim();
// const input =
//   "11-22,95-115,998-1012,1188511880-1188511890,222220-222224," +
//   "1698522-1698528,446443-446449,38593856-38593862,565653-565659," +
//   "824824821-824824827,2121212118-2121212124".trim();
// console.log(input);

function part1(input: string) {
  return input
    .split(",")
    .map((range) => range.split("-").map(Number) as [number, number])
    .flatMap(([first, last]) => {
      return Array.from(
        { length: last - first + 1 },
        (_, i) => first + i,
      ).filter((i) => {
        const text = String(i);
        const mid = Math.floor(text.length / 2);
        return text.slice(0, mid).repeat(2) === text;
      });
    })
    .reduce((sum, num) => sum + num, 0);
}

function part2(input: string) {
  return input
    .split(",")
    .map((range) => range.split("-").map(Number) as [number, number])
    .flatMap(([first, last]) => {
      return Array.from({ length: last - first + 1 }, (_, i) => first + i);
    })
    .filter((i) => {
      const text = String(i);
      return Array.from({ length: text.length / 2 }, (_, i) => 1 + i).some(
        (split) => text.slice(0, split).repeat(text.length / split) === text,
      );
    })
    .reduce((sum, num) => sum + num, 0);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
