import { INPUT, TEST_1, TEST_2, TEST_3, TEST_4 } from './input.ts';

console.log('20 décembre');

type Tlbr = [[number, number], [number, number], [number, number], [number, number]];

type Tile = {
    id: number;
    map: string[][];

    tlbr: Tlbr;
    sides: Set<number>;
}

function getTlbr(map: string[][]): Tlbr {
    let top1: number = 0;
    let bottom1: number = 0;
    for (let x: number = 0; x < map[0].length; x++) {
        top1 = top1 << 1;
        bottom1 = bottom1 << 1;
        if (map[0][x] === '#') {
            top1 |= 1;
        }
        if (map[map.length - 1][x] === '#') {
            bottom1 |= 1;
        }
    }

    let left1: number = 0;
    let right1: number = 0;
    for (let y: number = 0; y < map.length; y++) {
        left1 = left1 << 1;
        right1 = right1 << 1;
        if (map[y][0] === '#') {
            left1 |= 1;
        }
        if (map[y][map.length - 1] === '#') {
            right1 |= 1;
        }
    }

    return [[top1, reverse(top1)], [left1, reverse(left1)], [bottom1, reverse(bottom1)], [right1, reverse(right1)]];
}

function reverse(n: number): number {
    let result: number = 0;
    for (let i: number = 1; i <= 10; i++) {
        result = result << 1;
        if ((n & 1) === 1) {
            result |= 1;
        }
        n = n >> 1;
    }
    return result;
}

// part 1
function doPart1(input: string): void {
    const tiles: { [key: number]: Tile } = {};

    input.split('\n\n').map(t => {
        const lines: string[] = t.split('\n');
        const [, idS] = lines[0].match(/Tile\s(\d+):/)!;
        const map: string[][] = lines.slice(1).map((l, y) => [...l]);

        const id: number = Number.parseInt(idS);
        const tile: Tile = {
            id: id,
            map: map,
            tlbr: getTlbr(map),
            sides: new Set<number>()
        };

        const [[top1,top2],[left1,left2],[bottom1,bottom2],[right1, right2]] = tile.tlbr;
        tile.sides.add(top1);
        tile.sides.add(top2);
        tile.sides.add(left1);
        tile.sides.add(left2);
        tile.sides.add(bottom1);
        tile.sides.add(bottom2);
        tile.sides.add(right1);
        tile.sides.add(right2);

        tiles[id] = tile;
    });

    const corners: Tile[] = [];
    Object.values(tiles).forEach(t => {
        let used: number = 0;
        Object.values(tiles).filter(tt => tt.id !== t.id).forEach(tt => {
            const [[top1,top2],[left1,left2],[bottom1,bottom2],[right1, right2]] = t.tlbr;
            if (tt.sides.has(top1)
            || tt.sides.has(top2)
            || tt.sides.has(left1)
            || tt.sides.has(left2)
            || tt.sides.has(bottom1)
            || tt.sides.has(bottom2)
            || tt.sides.has(right1)
            || tt.sides.has(right2)
            ) {
                used++;
            }
        });
        if (used === 2) {
            corners.push(t);
        }
    });

    const r = corners.reduce((a, c) => c.id * a , 1);

    console.log(r);
}

// doPart1(TEST_1);
// doPart1(TEST_2);
// doPart1(TEST_3);
// doPart1(TEST_4);
doPart1(INPUT);

// part 2
function doPart2(input: string): void {
}

// doPart2(TEST_1);
// doPart2(TEST_2);
// doPart2(TEST_3);
// doPart2(TEST_4);
// doPart2(INPUT);
