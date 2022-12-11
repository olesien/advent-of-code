const run = async () => {
    const monkeys = await Deno.readTextFile("./monkeys.txt");
    const monkeyList = monkeys.split("\n\n");
    console.log(monkeyList);

    const monkeyItems = monkeyList.reduce((prevItems: number[][], monkey) => {
        const [monkeyMisc, startingItems] = monkey.split("\n");
        const items = startingItems.split(/[:,]+/).map((item) => Number(item));
        prevItems.push(items);
        return prevItems;
    }, []);
    const inspectedItems: number[][] = monkeyList.map(() => []);
    //Add for loop here up to 20 for each round!

    for (let round = 1; round <= 20; round++) {
        console.log("round " + round);
        monkeyList.forEach((monkey, monkeyIndex) => {
            const [
                monkeyMisc,
                startingItems,
                operation,
                test,
                testTrue,
                testFalse,
            ] = monkey.split("\n");
            console.log(
                monkeyMisc,
                startingItems,
                operation,
                test,
                testTrue,
                testFalse
            );
            const items = [...monkeyItems[monkeyIndex]];
            if (round === 1) {
                items.shift();
            }

            console.log(items);

            let worryLevel = 0;
            const operationStats = operation.split("=")[1];
            //console.log(operationStats);
            const changeNumberLegacy: string | number =
                operationStats.split(/[*+]+/)[1];
            let changeNumber: string | number =
                operationStats.split(/[*+]+/)[1];
            const divisibleBy = Number(test.split("by")[1]);

            //Operation: First bit is ALWAYS "old", second can be "old" or number, with it either being * or + as seperator
            const increaseWorryLevel = (item: number) => {
                if (String(changeNumberLegacy).includes("old")) {
                    changeNumber = item;
                } else {
                    changeNumber = Number(changeNumber);
                }
                if (operationStats.includes("*")) {
                    //Mulitply
                    return worryLevel * changeNumber;
                } else {
                    //Plus
                    return worryLevel + changeNumber;
                }
            };
            console.log("Monkey: " + monkeyIndex + ":");
            inspectedItems[monkeyIndex].push(0);
            items.forEach((item, index) => {
                console.log(
                    " Monkey inspects an item with a worry level of " + item
                );

                worryLevel = item;
                worryLevel = increaseWorryLevel(item);
                console.log("  Worry level is changed to " + worryLevel);
                worryLevel = Math.floor(worryLevel / 3);
                console.log(
                    "  Monkey gets bored with item. Worry level is divided by 3 to " +
                        worryLevel
                );
                //console.log(item);
                let newIndex = 0;
                if (worryLevel % divisibleBy === 0) {
                    //Throw to first
                    //console.log("first");
                    newIndex = Number(testTrue.split("monkey")[1]);
                } else {
                    //Throw to second
                    //console.log("second");
                    newIndex = Number(testFalse.split("monkey")[1]);
                }

                monkeyItems[newIndex].push(worryLevel);

                console.log(
                    "  Item with worry level " +
                        worryLevel +
                        " is thrown to monkey " +
                        newIndex
                );
            });
            monkeyItems.splice(monkeyIndex, 1, []);
        });
        console.log(monkeyItems);
    }
    //console.log(inspectedItems);
    const inspectedItemsCount = inspectedItems.map((monkey) => {
        return monkey.reduce((prevCount, count) => {
            return prevCount + 1;
        });
    });
    console.log(inspectedItemsCount);
};
run();
