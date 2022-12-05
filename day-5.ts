const run = async () => {
    const crates = await Deno.readTextFile("./crates.txt");
    const rows = crates.split("\n");
    let cratesObject: { [key: string]: string[] } = {};
    let instructions: { from: number; to: number }[] = [];
    let cratesDone = false;

    rows.forEach((row) => {
        if (row.length === 0) {
            cratesDone = true;
        } else {
            if (!cratesDone) {
                //Add to crates
                row.split("").forEach((char, index) => {
                    if (char.match(/[a-z]/i)) {
                        const id = (index - 1) / 4;
                        if (!cratesObject[id]) {
                            cratesObject[id] = [];
                        }
                        cratesObject[id].push(char);
                    }
                });
            } else {
                //Add to instructions
                const splitArray = row.split(/[\s,move,from,to]+/);
                const count = Number(splitArray[1]);
                const from = Number(splitArray[2]) - 1;
                const to = Number(splitArray[3]) - 1;
                for (let index = 0; index < count; index++) {
                    instructions.push({ from, to });
                }
                //console.log(splitString);
            }
        }
    });

    console.log(cratesObject);
    console.log(instructions);

    instructions.forEach((instruction) => {
        const crateFrom = cratesObject[instruction.from];
        const crateTo = cratesObject[instruction.to];
        const container = crateFrom.shift();
        if (container) {
            crateTo.unshift(container);
        }
    });

    console.log(cratesObject);
    const letterString = Object.values(cratesObject).reduce(
        (priorLetters, letterArray) => {
            return priorLetters + letterArray[0];
        },
        ""
    );
    console.log(letterString);
};
run();
