const run = async () => {
    const crates = await Deno.readTextFile("./crates.txt");
    console.log(crates);
    const rows = crates.split("\n");
    console.log(rows);
    let cratesObject: { [key: string]: string[] } = {};
    let instructions = [];
    let cratesDone = false;

    rows.forEach((row) => {
        if (row.length === 0) {
            cratesDone = true;
        } else {
            if (!cratesDone) {
                //Add to crates
                //Add 1, then every other
                row.split("").forEach((char, index) => {
                    if (char.match(/[a-z]/i)) {
                        //Input!
                        //1, 5, 9, 13, 17
                        //1 + n * 4 = 5
                        // (5-1) / 4
                        console.log(char, index);
                        console.log((index - 1) / 4);
                        const id = (index - 1) / 4;
                        if (!cratesObject[id]) {
                            cratesObject[id] = [];
                        }

                        cratesObject[id].push(char);
                    }
                });
            } else {
                //Add to instructions
            }
        }
    });
    console.log(cratesObject);
};
run();
