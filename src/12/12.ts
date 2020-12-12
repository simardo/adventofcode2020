import { INPUT, TEST_1 } from './input.ts';

console.log('12 décembre');

// part 1
function doPart1(input: string): void {
    const directions: [string, number][] = input.split('\n').map(d => [d[0], Number.parseInt(d.substr(1))]);

    let coord: [number, number] = [0, 0];

    const moveEast = (d: number) => coord[0] = coord[0] + d;
    const moveNorth = (d: number) => coord[1] = coord[1] - d;
    const moveWest = (d: number) => coord[0] = coord[0] - d;
    const moveSouth = (d: number) => coord[1] = coord[1] + d;

    let main = moveEast;

    directions.forEach(d => {
        const [dir, num] = d;
        if (dir === 'F') {
            main(num);
        } else if (dir === 'N') {
            moveNorth(num);
        } else if (dir === 'S') {
            moveSouth(num);
        } else if (dir === 'E') {
            moveEast(num);
        } else if (dir === 'W') {
            moveWest(num);
        } else if ((dir === 'L' && num === 90) || (dir === 'R' && num === 270)) {
            if (main === moveEast) {
                main = moveNorth;
            } else if (main === moveNorth) {
                main = moveWest;
            } else if (main === moveWest) {
                main = moveSouth;
            } else if (main === moveSouth) {
                main = moveEast;
            }
        }else if (num === 180) {
            if (main === moveEast) {
                main = moveWest;
            } else if (main === moveNorth) {
                main = moveSouth;
            } else if (main === moveWest) {
                main = moveEast;
            } else if (main === moveSouth) {
                main = moveNorth;
            }
        }else if ((dir === 'R' && num === 90) || (dir === 'L' && num === 270)) {
            if (main === moveEast) {
                main = moveSouth;
            } else if (main === moveNorth) {
                main = moveEast;
            } else if (main === moveWest) {
                main = moveNorth;
            } else if (main === moveSouth) {
                main = moveWest;
            }
        }
    });

    console.log(Math.abs(coord[0]) + Math.abs(coord[1]));
}

doPart1(TEST_1);
doPart1(INPUT);

// part 2
function doPart2(input: string): void {
    const directions: [string, number][] = input.split('\n').map(d => [d[0], Number.parseInt(d.substr(1))]);

    let waypoint = [10,-1];
    let coord = [0,0];

    const moveEast = (d: number) => waypoint[0] = waypoint[0] + d;
    const moveNorth = (d: number) => waypoint[1] = waypoint[1] - d;
    const moveWest = (d: number) => waypoint[0] = waypoint[0] - d;
    const moveSouth = (d: number) => waypoint[1] = waypoint[1] + d;

    directions.forEach(d => {
        const [dir, num] = d;
        if (dir === 'F') {
            coord[0] = coord[0] + waypoint[0] * num;
            coord[1] = coord[1] + waypoint[1] * num;
        } else if (dir === 'N') {
            moveNorth(num);
        } else if (dir === 'S') {
            moveSouth(num);
        } else if (dir === 'E') {
            moveEast(num);
        } else if (dir === 'W') {
            moveWest(num);
        } else if ((dir === 'L' && num === 90) || (dir === 'R' && num === 270)) {
            const [e,n] = waypoint;
            waypoint[0] = n;
            waypoint[1] = -e;
        }else if (num === 180) {
            const [e,n] = waypoint;
            waypoint[0] = -e;
            waypoint[1] = -n;
        }else if ((dir === 'R' && num === 90) || (dir === 'L' && num === 270)) {
            const [e,n] = waypoint;
            waypoint[0] = -n;
            waypoint[1] = e;
        }
    });

    console.log(Math.abs(coord[0]) + Math.abs(coord[1]));
}

doPart2(TEST_1);
doPart2(INPUT);
