import { readFileSync } from 'fs';

const input = readFileSync('inputs/day01.txt', 'utf-8').trim();
// const input = `
// L68
// L30
// R48
// L5
// R60
// L55
// L1
// L99
// R14
// L82`.trim()

// console.log(input)

function part1(input: string) {
    const positions = input
        .split('\n')
        .map(line => [
            line.match(/[A-Z]/)![0],
            parseInt(line.match(/\d+/)![0])
        ] as [string, number])
        .reduce((acc, [dir, num]) => {
            const prev = acc[acc.length - 1]!;
            let next = dir === "L" ? prev - num : prev + num;
            next = ((next % 100) + 100) % 100;
            return [...acc, next];
        }, [50]);
    console.log(positions)
    return positions.filter(n => n === 0).length
}

function part2(input: string) {
    return 0;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
