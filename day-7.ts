const run = async () => {
    //2061777 <- right answer
    const filesystem = await Deno.readTextFile("./filesystem.txt");
    //console.log(filesystem);
    const lines = filesystem.split("\n");
    //console.log(lines);
    const {
        directories,
        currentPath,
    }: { directories: { [key: string]: string }; currentPath: string } =
        lines.reduce(
            (system, line) => {
                const splitPath = system.currentPath.split("/");
                // console.log(line);
                // console.log(system);
                // console.log(splitPath);
                if (line[0] === "$") {
                    //Is command
                    if (line[2] === "l" && line[3] === "s") {
                        return { ...system, ls: line.split(" ")[2] };
                    }
                    if (line[2] === "c" && line[3] === "d") {
                        //cd
                        if (line.includes("..")) {
                            //Go back
                            if (system.currentPath !== "/") {
                                //Go back once
                                splitPath.pop();
                                return {
                                    ...system,
                                    currentPath: splitPath.join("/"),
                                };
                            } else {
                                return {
                                    ...system,
                                    currentPath: "/",
                                };
                            }
                        } else {
                            //Add to path
                            const actionArray = line.split(" ");
                            const newDirectory = actionArray[2];
                            if (newDirectory === "/") {
                                return { ...system, currentPath: "/" };
                            }
                            if (system.currentPath === "/") {
                                return {
                                    ...system,
                                    currentPath: "/" + newDirectory,
                                };
                            }
                            splitPath.push(newDirectory);

                            return {
                                ...system,
                                currentPath: splitPath.join("/"),
                            };
                        }
                    }
                } else if ("ls" in system) {
                    //Read line as ls
                    //console.log("Under " + system.currentPath);
                    const [size, file] = line.split(" ");
                    //console.log(size, file);
                    if (size === "dir") {
                        return system;
                    }
                    const exactFile =
                        system.currentPath +
                        (system.currentPath !== "/" ? "/" : "") +
                        file;
                    if (exactFile in system.directories)
                        return {
                            ...system,
                            directories: {
                                ...system.directories,
                                [exactFile]:
                                    Number(
                                        system.directories?[exactFile]
                                    ) + Number(size),
                            },
                        };
                    return {
                        ...system,
                        directories: {
                            ...system.directories,
                            [exactFile]: Number(size),
                        },
                    };
                }
                return system;
            },
            { directories: {}, currentPath: "/", ls: "" }
        );
    console.log(directories);

    //Fix so they all still have UNIQUE paths!
    const sizes: { [key: string]: number } = Object.keys(directories).reduce(
        (sizes, path) => {
            const newSizes: { [key: string]: number } = { ...sizes };
            const size = directories[path];
            const splitPath = path.split("/");
            const file = splitPath[splitPath.length - 1];
            splitPath.forEach((directory, index) => {
                const path = directory !== "" ? directory : "/";
                const sumOnesBefore = splitPath.reduce((sum, path, i) => {
                    if (i <= index) {
                        return sum + "?" + path;
                    }
                    return sum;
                });
                console.log(sumOnesBefore);
                if (path !== file) {
                    if (sumOnesBefore in newSizes) {
                        newSizes[sumOnesBefore] =
                            newSizes[sumOnesBefore] + Number(size);
                    } else {
                        newSizes[sumOnesBefore] = Number(size);
                    }
                }
            });
            return newSizes;
        },
        {}
    );
    console.log(sizes);

    //This is the answer I want to get at
    const summedSizes = Object.keys(sizes).reduce((totalSize, directory) => {
        const size = sizes[directory];
        if (size <= 100000) {
            return totalSize + size;
        }
        return totalSize;
    }, 0);
    const sortedSizes = Object.keys(sizes)
        .map((directory) => {
            const size = sizes[directory];
            const isEnough = size >= 4125990;
            return { size, directory, isEnough };
        })
        .sort((a, b) => b.size - a.size);
    console.log(summedSizes);
    console.log(sortedSizes);
};
//wrong: bqpslnv
