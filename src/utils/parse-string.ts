import { parse } from "@babel/parser";

export const parseString = (code: string, filename?: string) => {
    try {
        return parse(code, {
            plugins: ["typescript", "jsx"],
            allowImportExportEverywhere: true,
            sourceFilename: filename,
        });
    } catch (error) {
        console.error(filename, error);
        return null;
    }
};
