import globby from "globby";

export const getFiles = async (patterns: string[], ignore: string[], gitIgnore?: boolean) => {
    let paths: string[] = [];

    try {
        paths = await globby(patterns, {
            gitignore: gitIgnore,
            ignore,
        });
    } catch (error) {
        console.error("Error reading files");
        console.error(error);
    }

    return paths;
};
