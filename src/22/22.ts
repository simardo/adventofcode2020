import { INPUT, TEST_1 } from './input.ts';

console.log('22 décembre');

// part 1
function doPart1(input: string): void {
    const [p1, p2] = input.split('\n\n');

    const deck1: number[] = p1.split('\n').slice(1).map(c => Number.parseInt(c));
    const deck2: number[] = p2.split('\n').slice(1).map(c => Number.parseInt(c));

    while (deck1.length > 0 && deck2.length > 0) {
        const c1: number = deck1.shift()!;
        const c2: number = deck2.shift()!;

        if (c1 > c2) {
            deck1.push(...[c1, c2]);
        } else {
            deck2.push(...[c2, c1]);
        }
    }

    const winDeck: number[] = deck1.length > 0 ? deck1 : deck2;

    const r = winDeck.reverse().reduce((p, c, i) => p + (c * (i + 1)), 0);

    console.log(r);
}

doPart1(TEST_1);
doPart1(INPUT);

function doGame(deck1: number[], deck2: number[], id: number): number {
    const history1: Set<string> = new Set();
    const history2: Set<string> = new Set();

    while (deck1.length > 0 && deck2.length > 0) {
        const set: string = deck1.join(',');
        const set2: string = deck2.join(',');

        if (history1.has(set) || history1.has(set2)) {
            break;
        } else {
            history1.add(set);
            history2.add(set);

            const c1: number = deck1.shift()!;
            const c2: number = deck2.shift()!;

            if (deck1.length >= c1 && deck2.length >= c2) {
                const winner: number = doGame(deck1.slice(0, c1), deck2.slice(0, c2), id + 1);
                if (winner === 1) {
                    deck1.push(...[c1, c2]);
                } else {
                    deck2.push(...[c2, c1]);
                }
            } else if (c1 > c2) {
                deck1.push(...[c1, c2]);
            } else {
                deck2.push(...[c2, c1]);
            }
        }
    }

    return deck1.length > 0 ? 1 : 2;
}

// part 2
function doPart2(input: string): void {
    const [p1, p2] = input.split('\n\n');

    const deck1: number[] = p1.split('\n').slice(1).map(c => Number.parseInt(c));
    const deck2: number[] = p2.split('\n').slice(1).map(c => Number.parseInt(c));

    doGame(deck1, deck2, 1);

    const winDeck: number[] = deck1.length > 0 ? deck1 : deck2;

    const r = winDeck.reverse().reduce((p, c, i) => p + (c * (i + 1)), 0);

    console.log(r);
}

doPart2(TEST_1);
doPart2(INPUT);
