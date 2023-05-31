import { getFiles } from "./utils/get-files";
import { parseFile } from "./utils/parse-file";
import { checkContents } from "./utils/check-contents";
import { CheckLinks } from "./utils/get-links-from-comments";
import { logResults } from "./utils/log-results";

export type CheckConfig = {
    patterns?: string[];
    ignored?: string[];
    ignoreLinks?: string[];
    gitIgnore?: boolean;
    log?: boolean;
};

export type AllCheckResults = {
    valid: Array<CheckLinks & { file: string }>;
    invalid: Array<CheckLinks & { file: string }>;
    ignored: Array<CheckLinks & { file: string }>;
};

const checkLinks = async (config: CheckConfig) => {
    const {
        patterns = ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
        ignored = ["**/node_modules/**/*", "**/dist/**/*", "**/build/**/*", "**/*.test.*", "**/*.spec.*"],
        ignoreLinks = [],
        gitIgnore = true,
        log = true,
    } = config;

    const files = await getFiles(patterns, ignored, gitIgnore);

    const parsedFiles = await Promise.all(files.map(parseFile));

    const results: AllCheckResults = {
        valid: [],
        invalid: [],
        ignored: [],
    };

    await Promise.all(
        parsedFiles.map(async (item) => {
            if (item?.parsed && item?.file) {
                const fileResults = await checkContents(item.parsed, ignoreLinks, item.file, log);
                results.valid.push(...fileResults.valid.map((link) => ({ ...link, file: item.file })));
                results.invalid.push(...fileResults.invalid.map((link) => ({ ...link, file: item.file })));
                results.ignored.push(...fileResults.ignored.map((link) => ({ ...link, file: item.file })));
            }
        }),
    );

    if (log) {
        logResults(results);
    }

    return results;
};

export default checkLinks;
