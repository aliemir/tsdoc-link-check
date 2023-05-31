import { readFile } from "fs-extra";
import { parseString } from "./parse-string";

export const parseFile = async (path: string) => {
    let contents: string | null = null;

    try {
        const file = await readFile(path, "utf8");
        contents = file;
    } catch (error) {
        console.error("Error reading file");
        console.error(error);
        return null;
    }

    try {
        const parsed = parseString(contents, path);
        if (parsed) {
            return {
                parsed,
                file: path,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error parsing file");
        console.error(path, error);
        return null;
    }
};
