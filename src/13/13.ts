import { INPUT, TEST_1, TEST_2, TEST_3, TEST_4 } from './input.ts';

console.log('13 décembre');

// part 1
function doPart1(input: string): void {
    const a: string[] = input.split('\n');

    const exp: number = Number.parseInt(a[0]);
    const bus: number[] = a[1].split(',').map(b => Number.parseInt(b));

    const r = bus.reduce((s, b) => {
        let [id, time] = s;
        if (!Number.isNaN(b)) {
            const t: number = exp + (b - exp % b);
            if (t < time) {
                id = b;
                time = t;
            }
        }
        return [id, time];
    }, [Number.MAX_VALUE, Number.MAX_VALUE]);

    console.log((r[1] - exp) * r[0])
}

// doPart1(TEST_1);
// doPart1(TEST_2);
// doPart1(TEST_3);
// doPart1(TEST_4);
doPart1(INPUT);

// part 2

// ref https://fr.wikipedia.org/wiki/Th%C3%A9or%C3%A8me_des_restes_chinois

function doPart2(input: string): void {
    const a: string[] = input.split('\n');

    const bus: [number, number, number][] = a[1].split(',').map((b, i) => [Number.parseInt(b), i, Number.parseInt(b)]);

    const filter = bus.filter(b => !Number.isNaN(b[0]));
    let x: number = 1;
    let start: number = 0;

    filter.forEach(f => {
        while ((f[1] + start) % f[0] !== 0) {
            start += x;
        }
        x *= f[0];
    });

    console.log(start);
}


// doPart2(TEST_1);
// doPart2(TEST_2);
// doPart2(TEST_3);
// doPart2(TEST_4);
doPart2(INPUT);
