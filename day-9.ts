const run = async () => {
    const knots = await Deno.readTextFile("./knots.txt");

    const loggedHeadCords = [[0, 0]];
    const loggedTailCords1 = [[0, 0]];
    const loggedTailCords2 = [[0, 0]];
    const loggedTailCords3 = [[0, 0]];
    const loggedTailCords4 = [[0, 0]];
    const loggedTailCords5 = [[0, 0]];
    const loggedTailCords6 = [[0, 0]];
    const loggedTailCords7 = [[0, 0]];
    const loggedTailCords8 = [[0, 0]];
    const loggedTailCords9 = [[0, 0]];
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
            const tailCords1 = loggedTailCords1[loggedTailCords1.length - 1];
            const tailCords2 = loggedTailCords2[loggedTailCords2.length - 1];
            const tailCords3 = loggedTailCords3[loggedTailCords3.length - 1];
            const tailCords4 = loggedTailCords4[loggedTailCords4.length - 1];
            const tailCords5 = loggedTailCords5[loggedTailCords5.length - 1];
            const tailCords6 = loggedTailCords6[loggedTailCords6.length - 1];
            const tailCords7 = loggedTailCords7[loggedTailCords7.length - 1];
            const tailCords8 = loggedTailCords8[loggedTailCords8.length - 1];
            const tailCords9 = loggedTailCords9[loggedTailCords9.length - 1];

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

            //1
            if (!withinRange(tailCords1, newHeadCords)) {
                loggedTailCords1.push(headCords);
            } else {
                loggedTailCords1.push(tailCords1);
            }

            //2
            if (!withinRange(tailCords2, tailCords1)) {
                loggedTailCords2.push(tailCords1);
            } else {
                loggedTailCords2.push(tailCords2);
            }

            //3
            if (!withinRange(tailCords3, tailCords2)) {
                loggedTailCords3.push(tailCords2);
            } else {
                loggedTailCords3.push(tailCords3);
            }

            //4
            if (!withinRange(tailCords4, tailCords3)) {
                loggedTailCords4.push(tailCords3);
            } else {
                loggedTailCords4.push(tailCords3);
            }

            //5
            if (!withinRange(tailCords5, tailCords4)) {
                loggedTailCords5.push(tailCords4);
            } else {
                loggedTailCords5.push(tailCords5);
            }

            //6
            if (!withinRange(tailCords6, tailCords5)) {
                loggedTailCords6.push(tailCords5);
            } else {
                loggedTailCords6.push(tailCords6);
            }

            //7
            if (!withinRange(tailCords7, tailCords6)) {
                loggedTailCords7.push(tailCords6);
            } else {
                loggedTailCords7.push(tailCords7);
            }

            //8
            if (!withinRange(tailCords8, tailCords7)) {
                loggedTailCords8.push(tailCords7);
            } else {
                loggedTailCords8.push(tailCords8);
            }

            //9
            if (!withinRange(tailCords9, tailCords8)) {
                loggedTailCords9.push(tailCords8);
            } else {
                loggedTailCords9.push(tailCords9);
            }

            // //1
            // if (!withinRange(tailCords1, newHeadCords)) {
            //     loggedTailCords1.push(headCords);
            // } else {
            //     loggedTailCords1.push(tailCords1);
            // }
        }
    });

    //Render it to see
    loggedHeadCords.forEach((head, index) => {
        const tail1 = loggedTailCords1[index];
        const tail2 = loggedTailCords2[index];
        const tail3 = loggedTailCords3[index];
        const tail4 = loggedTailCords4[index];
        const tail5 = loggedTailCords5[index];
        const tail6 = loggedTailCords6[index];
        const tail7 = loggedTailCords7[index];
        const tail8 = loggedTailCords8[index];
        const tail9 = loggedTailCords9[index];
        console.log("XXXXXXXXXXX MOVE " + (index + 1));
        const render = [];
        for (let x = 0; x <= 5; x++) {
            let text = "";
            for (let y = 0; y <= 5; y++) {
                const isHead = head[1] === x && head[0] === y;
                const isTail1 = tail1[1] === x && tail1[0] === y;
                const isTail2 = tail2[1] === x && tail2[0] === y;
                const isTail3 = tail3[1] === x && tail3[0] === y;
                const isTail4 = tail4[1] === x && tail4[0] === y;
                const isTail5 = tail5[1] === x && tail5[0] === y;
                const isTail6 = tail6[1] === x && tail6[0] === y;
                const isTail7 = tail7[1] === x && tail7[0] === y;
                const isTail8 = tail8[1] === x && tail8[0] === y;
                const isTail9 = tail9[1] === x && tail9[0] === y;

                if (isHead) {
                    text += "H ";
                } else if (isTail1) {
                    text += "1 ";
                } else if (isTail2) {
                    text += "2 ";
                } else if (isTail3) {
                    text += "3 ";
                } else if (isTail4) {
                    text += "5 ";
                } else if (isTail5) {
                    text += "5 ";
                } else if (isTail6) {
                    text += "6 ";
                } else if (isTail7) {
                    text += "7 ";
                } else if (isTail8) {
                    text += "8 ";
                } else if (isTail9) {
                    text += "9 ";
                } else {
                    text += "_ ";
                }
            }

            render.push(text);
        }

        render.reverse().forEach((text) => {
            console.log(text);
        });
    });

    //Filter for unique positions
    const uniquePositions = loggedTailCords9.filter(
        ([x, y]: number[], index: number) => {
            const bestIndex = loggedTailCords9.findIndex(
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
