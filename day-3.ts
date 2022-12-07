const run = async () => {
    const rucksacks = await Deno.readTextFile("./rucksacks.txt");
    //console.log(rucksacks);
    //Mission:
    //Find the items that appear in both splits of each rucksack, take those letters (that have values 1-52) and combine them / total them

    //Part 1
    let total = 0;
    const rucksackList = rucksacks.split("\n");
    rucksackList.forEach((rucksack) => {
        const compartment1 = rucksack.slice(0, rucksack.length / 2);
        const compartment2 = rucksack.slice(
            rucksack.length / 2,
            rucksack.length
        );

        const existingLettersArray = compartment1
            .split("")
            .reduce((existingLetterArray: string[], letter: string) => {
                if (
                    !existingLetterArray.find(
                        (oldLetter) => oldLetter === letter
                    ) &&
                    compartment2
                        .split("")
                        .find((otherLetter) => otherLetter === letter)
                ) {
                    return [...existingLetterArray, letter];
                }
                return existingLetterArray;
            }, []);

        console.log(existingLettersArray);
        console.log(compartment1, compartment2);

        existingLettersArray.forEach((letter) => {
            const capitalizedLetter = letter.toUpperCase();
            let value = capitalizedLetter.charCodeAt(0) - 64;
            if (letter === capitalizedLetter) {
                //Is capitlized
                value += 26;
            }
            console.log(letter, value);
            total += value;
        });

        //console.log(rucksack);
    });

    //console.log(total);

    //Part 2
    const groupedSacks = rucksackList.reduce(
        (previousGroups: string[][], rucksack: string, index: number) => {
            const newArray = previousGroups;
            const groupIndex = Math.floor(index / 3);
            if (!newArray[groupIndex]) {
                newArray.push([rucksack]);
            } else {
                //Already exists
                newArray[groupIndex] = [...newArray[groupIndex], rucksack];
            }

            return newArray;
        },
        []
    );

    const groupSackValue = groupedSacks.reduce(
        (total: number, group: string[]) => {
            //Get common
            const firstSet = group[0];
            const secondSetArray = group[1].split("");
            const thirdSetArray = group[2].split("");
            const value = firstSet.split("").reduce((newValue, character) => {
                let additionalValue = 0;
                if (
                    secondSetArray.find((char) => char === character) &&
                    thirdSetArray.find((char) => char === character) &&
                    !newValue
                ) {
                    //We have them!
                    const capitalizedLetter = character.toUpperCase();
                    let value = capitalizedLetter.charCodeAt(0) - 64;
                    if (character === capitalizedLetter) {
                        //Is capitlized
                        value += 26;
                    }

                    additionalValue = value;
                }

                return newValue + additionalValue;
            }, 0);
            return total + value;
        },
        0
    );
    //console.log(groupedSacks);
    console.log(groupSackValue);
};

run();
