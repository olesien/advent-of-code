const run = async () => {
    const crates = await Deno.readTextFile("./crates.txt");
    console.log(crates);
    const rows = crates.split("\n");
    console.log(rows);
    let crateArray = [];
    let instructions = [];
    let cratesDone = false;

    rows.forEach((row) => {
        if (row.length === 0) {
            cratesDone = true;
        } else {
            if (!cratesDone) {
                //Add to crates
            } else {
                //Add to instructions
            }
        }
    });
};
run();
