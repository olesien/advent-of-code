const run = async () => {
    const trees = await Deno.readTextFile("./trees.txt");
    // console.log(trees);

    //2d array for the grid!
    const treesMap = trees
        .split("\n")
        .map((treeRow) => treeRow.split("").map((tree) => Number(tree)));
    console.log(treesMap);

    const visible = (
        treeLength: number,
        i: number,
        treeRow: { tree: number; id: number }[]
    ) => {
        let visibleLeft = true;
        let visibleRight = true;
        //Left to right
        // console.log("Array below is ")
        treeRow.forEach((blockingTree) => {
            if (blockingTree.id < i) {
                if (treeLength <= blockingTree.tree) {
                    visibleLeft = false;
                }
            }
            if (blockingTree.id > i) {
                if (treeLength <= blockingTree.tree) {
                    visibleRight = false;
                }
            }
        });
        return visibleLeft || visibleRight;
    };

    const visibleTrees = treesMap.reduce((sum, treeRow, index) => {
        if (index === 0 || index === treesMap.length - 1) {
            return sum + treeRow.length;
        }
        //Check if it's visible
        const rowSum = treeRow.reduce((rowSum, tree, i) => {
            //By the edge
            if (i === 0 || i === treeRow.length - 1) {
                return rowSum + 1;
            }

            //On the inside
            const treeColumn = treesMap.map((treeRow) => {
                const tree = treeRow.find((tree, index) => index === i);
                return tree ? tree : 0;
            });

            //console.log("column", treeColumn);

            if (
                visible(
                    tree,
                    i,
                    treeRow.map((tree, index) => ({ tree, id: index }))
                ) ||
                visible(
                    tree,
                    index,
                    treeColumn.map((tree, index) => ({ tree, id: index }))
                )
            ) {
                return rowSum + 1;
            }

            return rowSum;
        }, 0);
        return sum + rowSum;
    }, 0);

    const ratings = (
        treeLength: number,
        i: number,
        treeRow: { tree: number; id: number }[]
    ) => {
        let visibleLeft = true;
        let leftScore = -1;
        let visibleRight = true;
        let rightScore = -1;

        //console.log("---------- LEFT ----------");
        for (let id = i; id >= 0; id--) {
            const blockingTree = treeRow[id];
            //console.log(leftScore);
            if (visibleLeft) {
                leftScore++;
            }
            if (treeLength <= blockingTree.tree && !(id === i)) {
                //console.log("No longer visible");
                visibleLeft = false;
            }
        }
        // console.log(treeRow, i);
        // console.log("---------- RIGHT ----------");
        for (let id = i; id < treeRow.length; id++) {
            const blockingTree = treeRow[id];
            //console.log(rightScore);
            if (visibleRight) {
                rightScore++;
            }
            if (treeLength <= blockingTree.tree && !(id === i)) {
                //console.log("No longer visible");
                visibleRight = false;
            }
        }

        if (i === 0) {
            leftScore = 0;
        } else if (i === treeRow.length - 1) {
            rightScore = 0;
        }

        // if (leftScore > 2) leftScore = 2;
        // if (rightScore > 2) rightScore = 2;
        return [leftScore, rightScore];
    };

    const treeRatings = treesMap.reduce(
        (previousRatings, treeRow, columnId) => {
            treeRow.forEach((tree, rowId) => {
                const treeColumn = treesMap.map((treeRow) => {
                    const tree = treeRow.find((tree, index) => index === rowId);
                    return tree ? tree : 0;
                });
                const [left, right] = ratings(
                    tree,
                    rowId,
                    treeRow.map((tree, index) => ({ tree, id: index }))
                );
                const [top, bottom] = ratings(
                    tree,
                    columnId,
                    treeColumn.map((tree, index) => ({ tree, id: index }))
                );
                //console.log("returning");
                //console.log(columnId, rowId);

                //console.log(left, right, top, bottom);
                previousRatings.push(left * right * top * bottom);
            });
            return previousRatings;
        },
        []
    );

    console.log(visibleTrees);
    console.log(treeRatings.sort((a, b) => b - a));
};

run();
