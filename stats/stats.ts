import { readJsonSync } from 'https://deno.land/x/jsonfile/mod.ts';
import { fromFileUrl } from 'https://deno.land/std@0.69.0/path/mod.ts';

function readJson(path: string): object {
    const file = fromFileUrl(new URL(path, import.meta.url));
    return readJsonSync(file) as object;
}

const year: number = 2020;

const stats: any = readJson(`${year}.json`);
const members = stats['members'];

const begin: number = new Date(year, 11, 1).getTime() / 1000;
const end: number = new Date(year, 11, 26).getTime() / 1000;

let count: number = 0;
Object.values(members).forEach((m: any) => {
    let icount: number = 0;
    const cd: any = m['completion_day_level'];
    Object.values(cd).forEach((days: any) => {
        if (days['1']) {
            const d: number = Number.parseInt(days['1']['get_star_ts']);
            if (d >= begin && d < end) {
                icount++;
            }
        }
        if (days['2']) {
            const d: number = Number.parseInt(days['2']['get_star_ts']);
            if (d >= begin && d < end) {
                icount++;
            }
        }
    });
    console.log(m['name'], icount);
    count += icount;
})

console.log(count);
