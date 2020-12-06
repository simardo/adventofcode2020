import { INPUT, TEST_1, TEST_2 } from './input.ts';

console.log('6 décembre');

// part 1
function doPart1(input: string): void {
    const groups: string[] = input.split('\n\n');

    const r: number = groups.reduce((a,g)=> {
        const answ: Set<string> = g.split('\n').reduce((aa, gg) => {
            [...gg].forEach(ss => aa.add(ss));
            return aa;
        }, new Set<string>());

        return answ.size + a;
    }, 0);

    console.log(r);
}

doPart1(TEST_1);
doPart1(TEST_2);
doPart1(INPUT);

// part 2
function doPart2(input: string): void {
    const groups: string[] = input.split('\n\n');

    const r: number = groups.reduce((a,g)=> {
        const answ: Set<string> = g.split('\n').reduce((aa, gg) => aa === undefined ? new Set([...gg]) : new Set([...gg].filter(x => aa.has(x))), undefined! as Set<string>);

        return answ.size + a;
    }, 0);

    console.log(r);
}

doPart2(TEST_2);
doPart2(INPUT);
