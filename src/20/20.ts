import { INPUT, TEST_1, TEST_2, TEST_3, TEST_4, IMAGE, IMAGE_TEST, IMAGE_TEST_1, IMAGE_R, IMAGE_H, IMAGE_V } from './input.ts';

console.log('20 décembre');

type Tlbr = [[number, number], [number, number], [number, number], [number, number]];

type Tile = {
    id: number;
    map: string[][];

    tlbr: Tlbr;
    sides: Set<number>;
    inPuzzle?: boolean;

    top?: Tile;
    left?: Tile;
    bottom?: Tile;
    right?: Tile;
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

function getSides(tlbr: Tlbr): Set<number> {
    const [[top1, top2], [left1, left2], [bottom1, bottom2], [right1, right2]] = tlbr;

    const result: Set<number> = new Set<number>();
    result.add(top1);
    result.add(top2);
    result.add(left1);
    result.add(left2);
    result.add(bottom1);
    result.add(bottom2);
    result.add(right1);
    result.add(right2);

    return result;
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

        const [[top1, top2], [left1, left2], [bottom1, bottom2], [right1, right2]] = tile.tlbr;
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
            const [[top1, top2], [left1, left2], [bottom1, bottom2], [right1, right2]] = t.tlbr;
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

    const r = corners.reduce((a, c) => c.id * a, 1);

    console.log(r);
}

// doPart1(TEST_1);
// doPart1(TEST_2);
// doPart1(TEST_3);
// doPart1(TEST_4);
// doPart1(INPUT);

const TOP: number = 0;
const LEFT: number = 1;
const BOTTOM: number = 2;
const RIGHT: number = 3;

function render(tile: Tile): void {
    tile.map.forEach(m => console.log(m.join('')));
}

function toString(tile: Tile): string {
    return tile.map.map(line => line.join('')).join('\n');
}

function rotate(tile: Tile, times: number): void {
    for (let time: number = 1; time <= times; time++) {
        const newMap: string[][] = [];
        for (let x: number = 0; x < tile.map[0].length; x++) {
            const line: string[] = [];
            newMap.push(line);
            for (let y: number = tile.map[0].length - 1; y >= 0; y--) {
                line.push(tile.map[y][x])
            }
        }
        tile.map = newMap;
        tile.tlbr = getTlbr(tile.map);
        tile.sides = getSides(tile.tlbr);
    }
}

function flipH(tile: Tile): void {
    const newMap: string[][] = [];
    for (let y: number = tile.map.length - 1; y >= 0; y--) {
        const line: string[] = [];
        newMap.push(line);
        for (let x: number = 0; x < tile.map[y].length; x++) {
            line.push(tile.map[y][x]);
        }
    }
    tile.map = newMap;
    tile.tlbr = getTlbr(tile.map);
    tile.sides = getSides(tile.tlbr);

    // const newTop: Tile | undefined = tile.bottom;
    // const newBottom: Tile | undefined = tile.top;

    // tile.top = newTop;
    // tile.bottom = newBottom;
}

function flipV(tile: Tile): void {
    const newMap: string[][] = [];
    for (let y: number = 0; y < tile.map.length; y++) {
        const line: string[] = [];
        newMap.push(line);
        for (let x: number = tile.map[y].length - 1; x >= 0; x--) {
            line.push(tile.map[y][x]);
        }
    }
    tile.map = newMap;
    tile.tlbr = getTlbr(tile.map);
    tile.sides = getSides(tile.tlbr);

    // const newLeft: Tile | undefined = tile.right;
    // const newRight: Tile | undefined = tile.left;

    // tile.left = newLeft;
    // tile.right = newRight;
}

function connectTop(from: Tile, to: Tile): void {
    const [fromTop1, fromTop2] = from.tlbr[TOP];
    const [[top1, top2], [left1, left2], [bottom1, bottom2], [right1, right2]] = to.tlbr;

    if (fromTop1 === left1 || fromTop2 === left2) {
        rotate(from, 1);
        to.left = from;
        from.right = to;
    } else if (fromTop1 === left2 || fromTop2 === left1) {
        rotate(from, 1);
        flipH(from);
        to.left = from;
        from.right = to;
    } else if (fromTop1 === bottom1 || fromTop2 === bottom2) {
        to.bottom = from;
        from.top = to;
    } else if (fromTop1 === bottom2 || fromTop2 === bottom1) {
        flipV(from);
        to.bottom = from;
        from.top = to;
    } else if (fromTop1 === right1 || fromTop2 === right2) {
        rotate(from, 3);
        flipH(from);
        to.right = from;
        from.left = to;
    } else if (fromTop1 === right2 || fromTop2 === right1) {
        rotate(from, 3);
        to.right = from;
        from.left = to;
    } else if (fromTop1 === top1 || fromTop2 === top2) {
        flipH(from)
        to.top = from;
        from.bottom = to;
    } else if (fromTop1 === top2 || fromTop2 === top1) {
        flipH(from);
        flipV(from);
        to.top = from;
        from.bottom = to;
    }
}

function connectLeft(from: Tile, to: Tile): void {
    const [fromLeft1, fromLeft2] = from.tlbr[LEFT];
    const [[top1, top2], [left1, left2], [bottom1, bottom2], [right1, right2]] = to.tlbr;

    if (fromLeft1 === top1 || fromLeft2 === top2) {
        rotate(from, 3);
        to.top = from;
        from.bottom = to;
    } else if (fromLeft1 === top2 || fromLeft2 === top1) {
        rotate(from, 3);
        flipV(from);
        to.top = from;
        from.bottom = to;
    } else if (fromLeft1 === bottom1 || fromLeft2 === bottom2) {
        rotate(from, 1);
        flipV(from);
        to.bottom = from;
        from.top = to;
    } else if (fromLeft1 === bottom2 || fromLeft2 === bottom1) {
        rotate(from, 1);
        to.bottom = from;
        from.top = to;
    } else if (fromLeft1 === right1 || fromLeft2 === right2) {
        to.right = from;
        from.left = to;
    } else if (fromLeft1 === right2 || fromLeft2 === right1) {
        flipH(from);
        to.right = from;
        from.left = to;
    } else if (fromLeft1 === left1 || fromLeft2 === left2) {
        flipV(from)
        to.left = from;
        from.right = to;
    } else if (fromLeft1 === left2 || fromLeft2 === left1) {
        flipV(from);
        flipH(from);
        to.left = from;
        from.right = to;
    }
}

function connectBottom(from: Tile, to: Tile): void {
    const [fromBottom1, fromBottom2] = from.tlbr[BOTTOM];
    const [[top1, top2], [left1, left2], [bottom1, bottom2], [right1, right2]] = to.tlbr;

    if (fromBottom1 === left1 || fromBottom2 === left2) {
        rotate(from, 3);
        flipH(from);
        to.left = from;
        from.right = to;
    } else if (fromBottom1 === left2 || fromBottom2 === left1) {
        rotate(from, 3);
        to.left = from;
        from.right = to;
    } else if (fromBottom1 === top1 || fromBottom2 === top2) {
        to.top = from;
        from.bottom = to;
    } else if (fromBottom1 === top2 || fromBottom2 === top1) {
        flipV(from);
        to.top = from;
        from.bottom = to;
    } else if (fromBottom1 === right1 || fromBottom2 === right2) {
        rotate(from, 1);
        to.right = from;
        from.left = to;
    } else if (fromBottom1 === right2 || fromBottom2 === right1) {
        rotate(from, 1);
        flipH(from);
        to.right = from;
        from.left = to;
    } else if (fromBottom1 === bottom1 || fromBottom2 === bottom2) {
        flipH(from)
        to.bottom = from;
        from.top = to;
    } else if (fromBottom1 === bottom2 || fromBottom2 === bottom1) {
        flipH(from);
        flipV(from);
        to.bottom = from;
        from.top = to;
    }
}

function connectRight(from: Tile, to: Tile): void {
    const [fromRight1, fromRight2] = from.tlbr[RIGHT];
    const [[top1, top2], [left1, left2], [bottom1, bottom2], [right1, right2]] = to.tlbr;

    if (fromRight1 === top1 || fromRight2 === top2) {
        rotate(from, 1);
        flipV(from);
        to.top = from;
        from.bottom = to;
    } else if (fromRight1 === top2 || fromRight2 === top1) {
        rotate(from, 1);
        to.top = from;
        from.bottom = to;
    } else if (fromRight1 === bottom1 || fromRight2 === bottom2) {
        rotate(from, 3);
        to.bottom = from;
        from.top = to;
    } else if (fromRight1 === bottom2 || fromRight2 === bottom1) {
        rotate(from, 3);
        flipV(from);
        to.bottom = from;
        from.top = to;
    } else if (fromRight1 === left1 || fromRight2 === left2) {
        to.left = from;
        from.right = to;
    } else if (fromRight1 === left2 || fromRight2 === left1) {
        flipH(from);
        to.left = from;
        from.right = to;
    } else if (fromRight1 === right1 || fromRight2 === right2) {
        flipV(from)
        to.right = from;
        from.left = to;
    } else if (fromRight1 === right2 || fromRight2 === right1) {
        flipV(from);
        flipH(from);
        to.right = from;
        from.left = to;
    }
}

// part 2
function doPart2(input: string): void {
    const tiles: { [key: number]: Tile } = {};

    input.split('\n\n').map(t => {
        const lines: string[] = t.split('\n');
        const [, idS] = lines[0].match(/Tile\s(\d+):/)!;
        const map: string[][] = lines.slice(1).map((l, y) => [...l]);

        const id: number = Number.parseInt(idS);
        const tlbr = getTlbr(map);
        const sides = getSides(tlbr);
        const tile: Tile = {
            id: id,
            map: map,
            tlbr: tlbr,
            sides: sides
        };

        tiles[id] = tile;
    });

    // console.log(tiles);

    const puzzle: Tile[] = [];

    while (puzzle.length < Object.values(tiles).length) {
        Object.values(tiles).forEach(t => {
            if (!t.inPuzzle) {
                if (puzzle.length === 0) {
                    t.inPuzzle = true;
                    puzzle.push(t);
                } else {
                    let connect: boolean = false;
                    puzzle.forEach(tt => {
                        const [[top1, top2], [left1, left2], [bottom1, bottom2], [right1, right2]] = t.tlbr;

                        if (tt.sides.has(top1) && tt.sides.has(top2)) {
                            connectTop(t, tt);
                            connect = true;
                        }
                        if (tt.sides.has(left1) && tt.sides.has(left2)) {
                            connectLeft(t, tt);
                            connect = true;
                        }
                        if (tt.sides.has(bottom1) && tt.sides.has(bottom2)) {
                            connectBottom(t, tt);
                            connect = true;
                        }
                        if (tt.sides.has(right1) && tt.sides.has(right2)) {
                            connectRight(t, tt);
                            connect = true;
                        }
                    });
                    if (connect) {
                        t.inPuzzle = true;
                        puzzle.push(t);
                    }
                }
            }
        });
    }

    console.log(puzzle.length);
    puzzle.forEach(p => {
        console.log(p.id);
        console.log('t', p.top?.id);
        console.log('l', p.left?.id);
        console.log('b', p.bottom?.id);
        console.log('r', p.right?.id);
        console.log('--');
    })

    const topLeft: Tile = puzzle.find(t => !t.top && !t.left)!;

    const image: string[] = [];
    let bottom: Tile | undefined = topLeft;

    let line: string[] = [];
    let z: number = 0;
    while (bottom) {
        let right: Tile | undefined = bottom;
        for (let i: number = 1; i <= 8; i++) {
            image.push('');
        }
        while (right) {
            let c: number = 0;
            right.map.forEach((l, i) => {
                if (i > 0 && i < 9) {
                    image[z + c++] += l.slice(1, l.length - 1).join('')
                }
            });
            right = right.right;
        }
        bottom = bottom.bottom;
        z += 8;
    }

    // image.forEach((s,i) => console.log(s.substr(1, s.length - 2)));
    image.forEach((s, i) => console.log(s));
}

// doPart2(TEST_1);
// doPart2(TEST_2);
// doPart2(TEST_3);
// doPart2(TEST_4);
// doPart2(INPUT);

const monster: string =
    `
                  #
#    ##    ##    ###
 #  #  #  #  #  #
`

function rotateImage(image: string[][]): string[][] {
    const newImage: string[][] = [];
    for (let x: number = 0; x < image[0].length; x++) {
        const line: string[] = [];
        newImage.push(line);
        for (let y: number = image[0].length - 1; y >= 0; y--) {
            line.push(image[y][x])
        }
    }

    return newImage;
}

function flipHImage(image: string[][]): string[][] {
    const newImage: string[][] = [];
    for (let y: number = image.length - 1; y >= 0; y--) {
        const line: string[] = [];
        newImage.push(line);
        for (let x: number = 0; x < image[y].length; x++) {
            line.push(image[y][x]);
        }
    }

    return newImage;
}

function flipVImage(image: string[][]): string[][] {
    const newImage: string[][] = [];
    for (let y: number = 0; y < image.length; y++) {
        const line: string[] = [];
        newImage.push(line);
        for (let x: number = image[y].length - 1; x >= 0; x--) {
            line.push(image[y][x]);
        }
    }
    return newImage;
}

function doImages(input: string): void {
    const mapIndex: string[][] = input.split('\n').map((l, y) => [...l]);

    // rotateImage(mapIndex).forEach(l => console.log(l.join('')));
    console.log();
    flipHImage(mapIndex).forEach(l => console.log(l.join('')));
    console.log();
    flipVImage(mapIndex).forEach(l => console.log(l.join('')));
}

function doMonster(input: string): void {
    const map: string[] = input.split('\n').map((l, y) => l);
    const mapIndex: string[][] = input.split('\n').map((l, y) => [...l]);

    let monsterCount: number = 0;
    for (let i: number = 1; i < map.length - 1; i++) {
        let gap: number = 0;
        const prev: string = map[i - 1];
        const line: string = map[i];
        const next: string = map[i + 1];
        while (gap < line.length - 20) {
            if (line[gap] === '#' && line[gap + 5] === '#' && line[gap + 6] === '#' && line[gap + 11] === '#' && line[gap + 12] === '#' && line[gap + 17] === '#' && line[gap + 18] === '#' && line[gap + 19] === '#'
                && prev[gap + 18] === '#'
                && next[gap + 1] === '#' && next[gap + 4] === '#' && next[gap + 7] === '#' && next[gap + 10] === '#' && next[gap + 13] === '#' && next[gap + 16] === '#') {
                monsterCount++;
            }
            gap++
        }
    }

    // console.log(map);
    console.log(monsterCount);

    const r = mapIndex.reduce((a, l) => {
        return a + l.reduce((aa, ll) => ll === '#' ? aa + 1 : aa,0)
    }, 0);

    console.log(r - (15 * monsterCount));
}

doMonster(IMAGE_R);
doMonster(IMAGE_H);
doMonster(IMAGE_V);
// doImages(IMAGE_R);
