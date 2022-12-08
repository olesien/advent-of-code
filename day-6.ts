const run = async () => {
    const device = await Deno.readTextFile("./device.txt");
    console.log(device);
    let responded = false;
    let responded2 = false;
    function isUnique(str: string) {
        return new Set(str).size == str.length;
    }

    device.split("").forEach((character, index) => {
        const character2 = device[index - 1];
        const character3 = device[index - 2];
        const character4 = device[index - 3];
        // if ((index + 1) % 4 === 0) {
        //     console.log("check");
        // }
        if (
            index > 3 &&
            character != character2 &&
            character != character3 &&
            character != character4 &&
            character2 != character3 &&
            character2 != character4 &&
            character3 != character4 &&
            !responded
            // index % 4 === 0
        ) {
            // console.log(character + character2 + character3 + character4);
            // console.log(index + 1);
            responded = true;
        }
    });

    device.split("").forEach((character, index) => {
        if (index >= 13) {
            const last14Characters = device
                .split("")
                .filter((character, i) => i >= index - 13 && i <= index)
                .join("");
            // console.log(last14Characters);
            // console.log()
            if (isUnique(last14Characters) && !responded2) {
                responded2 = true;
                console.log(last14Characters);
                console.log(index + 1);
            }
        }
    });

    // device.split("").forEach((character, index) => {

    //         const last14Characters = device
    //             .split("")
    //             .filter((character, i) => i <= index && i >= index + 14)
    //             .join("");
    //         // console.log(last14Characters);
    //         // console.log()
    //         if (isUnique(last14Characters) && !responded2) {
    //             responded2 = true;
    //             console.log(last14Characters);
    //             console.log(index);
    //             console.log(index - 13);
    //         }

    // });
};
run();
