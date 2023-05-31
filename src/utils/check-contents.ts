import { getLinksFromComments } from "./get-links-from-comments";
import { checkLink } from "./check-link";

import type { ParseResult } from "@babel/parser";
import type { File } from "@babel/types";

import type { CheckLinks } from "./get-links-from-comments";
import { failedLink, ignoredLink, successfullLink } from "./log-results";

export type CheckResult = {
    valid: Array<CheckLinks>;
    invalid: Array<CheckLinks>;
    ignored: Array<CheckLinks>;
};

export const checkContents = async (parsed: ParseResult<File>, ignoredLinks: string[], file: string, log?: boolean) => {
    const linksFromComments = getLinksFromComments(parsed.comments);

    const results: CheckResult = {
        valid: [],
        invalid: [],
        ignored: [],
    };

    for await (const link of linksFromComments) {
        if (link.link.urlDestination) {
            if (ignoredLinks.includes(link.link.urlDestination)) {
                if (log) ignoredLink(link.link.urlDestination, file);
                results.ignored.push(link);
                continue;
            }

            const valid = await checkLink(link.link.urlDestination, file, log);
            if (valid && log) {
                successfullLink(link.link.urlDestination, file);
            } else if (log) {
                failedLink(link.link.urlDestination, file);
            }
            if (valid) {
                results.valid.push(link);
            } else {
                results.invalid.push(link);
            }
        } else {
            results.invalid.push(link);
        }
    }

    return results;
};
