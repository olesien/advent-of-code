const run = async () => {
    const monkeys = await Deno.readTextFile("./monkeys.txt");
    const monkeyList = monkeys.split("\n\n");
    console.log(monkeyList);

    const monekyItems = monkeyList.reduce((prevItems: number[][], monkey) => {
        const [monkeyMisc, startingItems] = monkey.split("\n");
        const items = startingItems.split(/[:,]+/).map((item) => Number(item));
        prevItems.push(items);
        return prevItems;
    }, []);
    const inspectedItems: number[][] = monkeyList.map(() => []);
    //Add for loop here up to 20 for each round!
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
        const items = [...monekyItems[monkeyIndex]];
        items.shift();
        console.log(items);

        let worryLevel = 0;
        const operationStats = operation.split("=")[1];
        //console.log(operationStats);
        let changeNumber: string | number = operationStats.split(/[*+]+/)[1];
        const divisibleBy = Number(test.split("by")[1]);

        //Operation: First bit is ALWAYS "old", second can be "old" or number, with it either being * or + as seperator
        const increaseWorryLevel = () => {
            if (String(changeNumber).includes("old")) {
                changeNumber = worryLevel;
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
        items.forEach((item, index) => {
            console.log(
                " Monkey inspects an item with a worry level of " + item
            );
            inspectedItems[monkeyIndex].push(item);
            worryLevel = item;
            worryLevel = increaseWorryLevel();
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

            monekyItems[newIndex].push(worryLevel);

            console.log(
                "  Item with worry level " +
                    worryLevel +
                    " is thrown to monkey " +
                    newIndex
            );
        });
        monekyItems.splice(monkeyIndex, 1, []);
    });
    console.log(inspectedItems);
    console.log(monekyItems);
};
run();
