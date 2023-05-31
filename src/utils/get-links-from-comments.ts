import { TSDocParser, DocLinkTag } from "@microsoft/tsdoc";
import type { CommentBlock, CommentLine, SourceLocation } from "@babel/types";

import { getLinkTags } from "./get-link-tags";

export type CheckLinks = {
    location?: SourceLocation;
    link: DocLinkTag;
};

export const getLinksFromComments = (comments?: (CommentBlock | CommentLine)[] | null) => {
    const links: CheckLinks[] = [];

    comments?.forEach((comment) => {
        const parser = new TSDocParser();

        const tsdocComment = parser.parseString(`/**${comment.value}*/`);

        const linksInComment = getLinkTags(tsdocComment.docComment)
            .filter((linkTag) => "urlDestination" in linkTag)
            .filter((tag, index, arr) => {
                const firstIndex = arr.findIndex((item) => item.urlDestination === tag.urlDestination);
                return firstIndex === index;
            });
        const linksWithLocation = linksInComment.map((link) => {
            const location = comment.loc;
            return {
                link,
                location,
            };
        });

        links.push(...linksWithLocation);
    });

    return links;
};
