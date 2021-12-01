import { INPUT, TEST_1 } from './input.ts';

console.log('2 décembre');

const rx: RegExp = /(\d+)-(\d+)\s(\w):\s(\w+)/g;

// part 1
function doPart1(input: string): void {
    let match: RegExpMatchArray | null;
    let valid: number = 0;

    while ((match = rx.exec(input)) !== null) {
        const [, min, max, char, pwd] = match;

        const occ: number = [...pwd].reduce((p, s) => s === char ? p + 1 : p, 0);
        if (occ >= Number.parseInt(min) && occ <= Number.parseInt(max)) {
            valid++;
        }
    }

    console.log(valid);
}

doPart1(INPUT);

// part 2
function doPart2(input: string): void {
    let match: RegExpMatchArray | null;
    let valid: number = 0;

    while ((match = rx.exec(input)) !== null) {
        const [, idx1, idx2, char, pwd] = match;

        if ((pwd[Number.parseInt(idx1) - 1] === char) !== (pwd[Number.parseInt(idx2) - 1] === char)) {
            valid++;
        }
    }

    console.log(valid);
}

doPart2(INPUT);
