console.log("Welcome to Deno!");

const run = async () => {
    const strategy = await Deno.readTextFile("./strategy.txt");
    let score = 0;
    let score2 = 0;
    //console.log(strategy);
    const rounds = strategy.split("\n");
    const actionScore = (move: string) => {
        switch (move) {
            case "A":
                return 1;
            case "X":
                return 1;
            case "B":
                return 2;
            case "Y":
                return 2;
            case "C":
                return 3;
            case "Z":
                return 3;
            default:
                return 0;
        }
    };
    const youWin = (yourAction: number, enemyAction: number) => {
        if (
            (yourAction === 1 && enemyAction === 3) ||
            (yourAction === 2 && enemyAction === 1) ||
            (yourAction === 3 && enemyAction === 2)
        ) {
            return 6;
        }
        return 0;
    };

    const moveToBeat = (enemyAction: number) => {
        switch (enemyAction) {
            case 1:
                return 2;
            case 2:
                return 3;
            case 3:
                return 1;
            default:
                return 0;
        }
    };

    const moveToLose = (enemyAction: number) => {
        switch (enemyAction) {
            case 2:
                return 1;
            case 3:
                return 2;
            case 1:
                return 3;
            default:
                return 0;
        }
    };

    // console.log(rounds);
    rounds.forEach((round) => {
        const actions = round.split(" ");

        const opponentMoveScore = actionScore(actions[0]);
        const yourMoveScore = actionScore(actions[1]);

        if (opponentMoveScore === undefined) return;
        // console.log(actions[0], actions[1]);
        // console.log(opponentMoveScore, yourMoveScore);
        if (opponentMoveScore === yourMoveScore) {
            //draw
            score += 3 + yourMoveScore;
        } else {
            score += youWin(yourMoveScore, opponentMoveScore) + yourMoveScore;
        }

        //Second part
        if (yourMoveScore === 1) {
            //Lose
            score2 += moveToLose(opponentMoveScore);
        } else if (yourMoveScore === 2) {
            //Draw
            score2 += 3 + opponentMoveScore;
        } else {
            //Win
            score2 += 6 + moveToBeat(opponentMoveScore);
        }
    });
    console.log(score2);
};

run();
