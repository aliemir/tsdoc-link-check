import { retryLink } from "./log-results";

export const checkLink = async (link: string, file?: string, log?: boolean) => {
    if (!link.startsWith("http")) return false;

    const maxRetries = 3;

    let retryCount = 0;
    let valid: boolean | undefined = undefined;

    while (retryCount < maxRetries && valid === undefined) {
        if (retryCount > 0) {
            if (log && file) retryLink(link, file, retryCount);
        }
        try {
            const response = await fetch(link, {
                method: "HEAD",
                redirect: "follow",
            });

            if (response.status === 200) {
                valid = true;
                break;
            } else {
                retryCount++;
            }
        } catch (_error) {
            retryCount++;
        }
    }

    if (valid === undefined) {
        valid = false;
    }

    return valid;
};
