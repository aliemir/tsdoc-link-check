import { DocInlineTag, DocLinkTag } from "@microsoft/tsdoc";

import type { DocNode } from "@microsoft/tsdoc";

export const getLinkTags = (node: DocNode): Array<DocLinkTag> => {
    return node.getChildNodes().flatMap((childNode) => {
        if (node instanceof DocInlineTag && node.tagName === "@link") {
            const url = node.tagContent.split(" ").find((item) => item.startsWith("http"));
            return [
                new DocLinkTag({
                    urlDestination: url,
                    tagName: "@link",
                    configuration: node.configuration,
                }),
            ];
        }
        if (childNode instanceof DocLinkTag) {
            return [childNode];
        } else {
            return getLinkTags(childNode);
        }
    });
};
