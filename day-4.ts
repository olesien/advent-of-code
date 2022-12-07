const run = async () => {
    const pairs = await Deno.readTextFile("./pairs.txt");
    console.log(pairs);
    //[{start: 11, end: 12}]

    //Look through each pair
    const getRange = (pair: string) => {
        const ranges = pair.split(",");
        return { range1: ranges[0], range2: ranges[1] };
    };
    const extractRange = (range: string) => {
        const ranges = range.split("-");
        return { start: ranges[0], end: ranges[1] };
    };

    const containsRange = (
        start1: number,
        end1: number,
        start2: number,
        end2: number
    ) => {
        if (
            (start1 >= start2 && end1 <= end2) ||
            (start2 >= start1 && end2 <= end1)
        ) {
            return true;
        }
        return false;
    };

    const overlapsRange = (
        start1: number,
        end1: number,
        start2: number,
        end2: number
    ) => {
        if (
            (start1 >= start2 && start1 <= end2) ||
            (end1 >= start2 && end1 <= end2) ||
            (start2 >= start1 && start2 <= end1) ||
            (end2 >= start1 && end2 <= end1)
        ) {
            return true;
        }
        return false;
    };

    //Part1
    const fullyoverlappingpairs = pairs
        .split("\n")
        .reduce((overlapTotal, pair) => {
            const { range1, range2 } = getRange(pair);
            // console.log(range1, range2);

            //Check if range1 can go into range 2 or the opposite
            const { start: start1, end: end1 } = extractRange(range1);
            const { start: start2, end: end2 } = extractRange(range2);
            // console.log(start1, end1);
            // console.log(start2, end2);
            if (
                containsRange(
                    Number(start1),
                    Number(end1),
                    Number(start2),
                    Number(end2)
                )
            ) {
                console.log("overlap!");
                console.log(range1, range2);
                return overlapTotal + 1;
            }
            return overlapTotal;
        }, 0);
    console.log(fullyoverlappingpairs);
    const overlappingpairs = pairs.split("\n").reduce((overlapTotal, pair) => {
        const { range1, range2 } = getRange(pair);
        // console.log(range1, range2);

        //Check if range1 can go into range 2 or the opposite
        const { start: start1, end: end1 } = extractRange(range1);
        const { start: start2, end: end2 } = extractRange(range2);
        // console.log(start1, end1);
        // console.log(start2, end2);
        if (
            overlapsRange(
                Number(start1),
                Number(end1),
                Number(start2),
                Number(end2)
            )
        ) {
            console.log("overlap!");
            console.log(range1, range2);
            return overlapTotal + 1;
        }
        return overlapTotal;
    }, 0);
    // console.log(pairs.split("\n").length);
    console.log(overlappingpairs);
};

run();
