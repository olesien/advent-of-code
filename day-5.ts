const run = async () => {
    const crates = await Deno.readTextFile("./crates.txt");
    const rows = crates.split("\n");
    let cratesObject: { [key: string]: string[] } = {};
    let instructions: { from: number; to: number }[] = [];
    let instructions2: { from: number; to: number; count: number }[] = [];
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

                //part 2
                instructions2.push({ from, to, count });
                //console.log(splitString);
            }
        }
    });

    const cratesObject2: { [key: string]: string[] } = { ...cratesObject };
    console.log(cratesObject);

    // instructions.forEach((instruction) => {
    //     const crateFrom = cratesObject[instruction.from];
    //     const crateTo = cratesObject[instruction.to];
    //     const container = crateFrom.shift();
    //     if (container) {
    //         crateTo.unshift(container);
    //     }
    // });

    console.log(cratesObject);
    const letterString = Object.values(cratesObject).reduce(
        (priorLetters, letterArray) => {
            return priorLetters + letterArray[0];
        },
        ""
    );
    console.log(letterString);
    console.log("PART 2 XXXXXXXXXXXXXXX");
    //Part 2
    instructions2.forEach((instruction) => {
        console.log(instruction);
        let crateFrom = cratesObject2[instruction.from];
        let crateTo = cratesObject2[instruction.to];
        console.log(cratesObject2);
        console.log("----");
        console.log(crateFrom);
        let containers = crateFrom.filter(
            (container, index) => index >= 0 && index <= instruction.count - 1
        );
        console.log(instruction.count);
        console.log(containers);
        crateFrom.splice(0, instruction.count);
        if (containers) {
            //crateTo.unshift(...containers);
            crateTo.unshift(...containers);
            //crateTo.splice(0, 0, ...containers);
        }
        console.log(cratesObject2);
    });

    const letterString2 = Object.values(cratesObject2).reduce(
        (priorLetters, letterArray) => {
            return priorLetters + letterArray[0];
        },
        ""
    );
    console.log(cratesObject2);
    console.log(letterString2);
};
run();
