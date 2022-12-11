const run = async () => {
    const raytube = await Deno.readTextFile("./raytube.txt");
    const cycleClusters = raytube.split("\n");
    console.log(cycleClusters);
    let x = 1;
    let cycle = 1;
    const interestingCycles: number[] = [];
    let crt: string = "#";

    const increaseCycle = () => {
        if ((cycle - 20) % 40 === 0) {
            //Very interesting!
            console.log(x, cycle);
            interestingCycles.push(x * cycle);
        }

        // let row = crt[latestRowIndex - 1];
        if (cycle % 40 >= x - 1 && cycle % 40 <= x + 1) {
            //Lit
            crt += "#";
        } else {
            crt += ".";
        }
        console.log(crt);
        cycle++;
    };

    cycleClusters.forEach((cluster) => {
        if (cluster === "noop") {
            //Do nothing, increase one cycle
            increaseCycle();
        } else {
            //addx
            const splitCluster = cluster.split(" ");
            const command = splitCluster[0];
            const count = Number(splitCluster[1]);
            if (command === "addx") {
                increaseCycle();

                x += count;
                increaseCycle();
            }
        }
    });
    // console.log(cycle, x);
    // console.log(interestingCycles);
    const sum = interestingCycles.reduce((sum, count) => {
        return sum + count;
    }, 0);
    console.log(sum);

    console.log(crt.split(/(.{40})/).filter((x) => x.length == 40));
};
run();
