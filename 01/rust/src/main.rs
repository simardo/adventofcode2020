use std::fs;

fn main() {
    println!("1er décembre 2020");

    let test = String::from(
        "1721
979
366
299
675
1456",
    );

    let input =
        fs::read_to_string("./src/input.txt").expect("Something went wrong reading the file");

    let part_one = do_part_one(&test);
    assert_eq!(part_one, 514579);

    println!("part 1: {}", do_part_one(&input));

    let part_two = do_part_two(test);
    assert_eq!(part_two, 241861950);

    println!("part 2: {}", do_part_two(input));
}

// part 1
fn do_part_one(input: &String) -> i32 {
    let values: Vec<i32> = input.split('\n').map(|x| x.parse().unwrap()).collect();

    values.iter().enumerate().fold(0, |acc, (i, value_a)| {
        if let Some(value_b) = values
            .iter()
            .skip(i)
            .find(|value_b| value_a + *value_b == 2020)
        {
            value_a * value_b
        } else {
            acc
        }
    })
}

// part 2
fn do_part_two(input: String) -> i32 {
    let values: Vec<i32> = input.split('\n').map(|x| x.parse().unwrap()).collect();

    let mut result = 0;
    let max = values.len() - 1;
    for i in 0..max {
        for j in i + 1..max {
            for k in j + 1..max {
                if values[i] + values[j] + values[k] == 2020 {
                    result = values[i] * values[j] * values[k];
                    break;
                }
            }
            if result > 0 {
                break;
            }
        }
        if result > 0 {
            break;
        }
    }

    result
}
