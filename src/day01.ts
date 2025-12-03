import { readFileSync } from 'fs';

const input = readFileSync('inputs/day01.txt', 'utf-8').trim();



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
    // console.log(positions)
    return positions.filter(n => n === 0).length
}

function part2(input: string) {
    const [, zeros] = input
        .split('\n')
        .map(line => [
            line.match(/[A-Z]/)![0],
            parseInt(line.match(/\d+/)![0])
        ] as [string, number])
        .reduce<[number, number]>((acc, [dir, num]) => {
            let [next, zero] = acc;
            const delta = dir === "L" ? -1 : 1;
            for (let i = 0; i < num;  i++) {
                next = ((next + delta) % 100 + 100) % 100;
                if (next === 0) zero++;
            }
            return [next, zero];
        }, [50, 0]);
    return zeros
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
