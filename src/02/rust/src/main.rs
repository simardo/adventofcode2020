use regex::Regex;
use std::fs;

fn main() {
    println!("2 décembre 2020");

    let test = String::from(
        "1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc",
    );

    let input =
        fs::read_to_string("./src/input.txt").expect("Something went wrong reading the file");

    let part_one = do_part_one(&test);
    assert_eq!(part_one, 2);

    println!("part 1: {}", do_part_one(&input));

    let part_two = do_part_two(&test);
    assert_eq!(part_two, 1);

    println!("part 2: {}", do_part_two(&input));
}

const RE: &str = r"(?P<first>\d+)-(?P<second>\d+)\s(?P<char>\w):\s(?P<psw>\w+)";

// part 1
fn do_part_one(input: &String) -> i32 {
    let re: Regex = Regex::new(RE).unwrap();
    let mut valid = 0;

    for capture in re.captures_iter(input) {
        let occurences = capture["psw"].chars().fold(0, |occurences, character| {
            if character == capture["char"].chars().nth(0).unwrap() {
                occurences + 1
            } else {
                occurences
            }
        });

        if occurences >= capture["first"].parse().unwrap() && occurences <= capture["second"].parse().unwrap() {
            valid += 1;
        }
    }

    valid
}

// part 2
fn do_part_two(input: &String) -> i32 {
    let re: Regex = Regex::new(RE).unwrap();
    let mut valid = 0;

    for capture in re.captures_iter(input) {
        let index1: usize = capture["first"].parse().unwrap();
        let index2: usize = capture["second"].parse().unwrap();

        if (capture["psw"].chars().nth(index1 - 1).unwrap() == capture["char"].chars().nth(0).unwrap()) !=
        (capture["psw"].chars().nth(index2 - 1).unwrap() == capture["char"].chars().nth(0).unwrap()) {
            valid += 1;
        }
    }

    valid
}
