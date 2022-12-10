const run = async () => {
    const knots = await Deno.readTextFile("./knots.txt");

    const loggedHeadCords = [[10000, 10000]];
    const loggedTailCords = [[10000, 10000]];
    // const Area = [[[]]];
    const instructions = knots.split("\n");
    const withinRange = (tail: number[], head: number[]) => {
        //Detect if it's still on a side

        //if head is +- 1 in X or +- 1 in Y, then it IS within range of
        const headX = head[0];
        const headY = head[1];
        const tailX = tail[0];
        const tailY = tail[1];

        if (
            headX >= tailX - 1 &&
            headX <= tailX + 1 &&
            headY >= tailY - 1 &&
            headY <= tailY + 1
        ) {
            return true;
        }

        return false;
    };

    instructions.forEach((instruction) => {
        const instructionSet = instruction.split(" ");
        const direction = instructionSet[0];
        const moveAmount = Number(instructionSet[1]);
        console.log(direction, moveAmount);

        for (let i = 0; i < moveAmount; i++) {
            const headCords = loggedHeadCords[loggedHeadCords.length - 1];
            const tailCords = loggedTailCords[loggedTailCords.length - 1];

            let newHeadCords = [0, 0];

            if (direction === "R") {
                //Move right
                newHeadCords = [headCords[0] + 1, headCords[1]];
            } else if (direction === "U") {
                //Move up
                newHeadCords = [headCords[0], headCords[1] + 1];
            } else if (direction === "D") {
                //Move down
                newHeadCords = [headCords[0], headCords[1] - 1];
            } else {
                //L
                //Move left
                newHeadCords = [headCords[0] - 1, headCords[1]];
            }
            if (newHeadCords[0] < 0 || newHeadCords[1] < 0) {
                console.log(newHeadCords);
            }

            loggedHeadCords.push(newHeadCords);
            if (!withinRange(tailCords, newHeadCords)) {
                loggedTailCords.push(headCords);
            } else {
                loggedTailCords.push(tailCords);
            }
        }
    });
    console.log(loggedHeadCords);
    console.log(loggedTailCords);

    //Render it to see
    loggedHeadCords.forEach((head, index) => {
        const tail = loggedTailCords[index];
        //console.log("XXXXXXXXXXX MOVE " + (index + 1));
        const render = [];
        for (let x = 0; x <= 5; x++) {
            let text = "";
            for (let y = 0; y <= 5; y++) {
                const isHead = head[1] === x && head[0] === y;
                const isTail = tail[1] === x && tail[0] === y;

                if (isHead) {
                    text += "H ";
                } else if (isTail) {
                    text += "T ";
                } else {
                    text += "_ ";
                }
            }

            render.push(text);
        }

        render.reverse().forEach((text) => {
            //console.log(text);
        });
    });

    //Filter for unique positions
    const uniquePositions = loggedTailCords.filter(
        ([x, y]: number[], index: number) => {
            const bestIndex = loggedTailCords.findIndex(
                ([xx, yy]: number[]) => xx === x && yy === y
            );
            if (bestIndex === index) return true;
            return false;
        }
    );

    // loggedTailCords.filter(
    //     (position, index, self) => self.indexOf(position) === index
    // );
    console.log(uniquePositions);
    console.log(uniquePositions.length);
};
run();

//3025, 3026 too low
