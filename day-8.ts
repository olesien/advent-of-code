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

        // if (visible) {
        //     console.log("in");
        //     console.log(treeRow);
        //     console.log(i + " is visible with length" + treeLength);
        // }
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

    console.log(visibleTrees);
};

run();