#!/usr/bin/env node
import { Command } from "commander";
import run from "./index";

const program = new Command();

// can be used like executable <entries...>
program
    .version("0.0.1")
    .description("A CLI for checking links in comments in your codebase")
    .option("-p, --patterns <patterns...>", "Entry files", ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"])
    .option("-i, --ignored <ignored...>", "Patterns to ignore", [
        "**/node_modules/**/*",
        "**/dist/**/*",
        "**/build/**/*",
        "**/*.test.*",
        "**/*.spec.*",
    ])
    .option("-l, --ignore-links <links...>", "Links to ignore", [])
    .option("-g, --git-ignore", "Ignore files in .gitignore", true)
    .option("-o, --no-log", "Log the results", true)
    .parse(process.argv);

const options = program.opts();

run({
    patterns: options.patterns,
    ignored: options.ignored,
    ignoreLinks: options.ignoreLinks,
    gitIgnore: options.gitIgnore,
    log: options.log,
}).then((results) => {
    if (results.invalid.length > 0) {
        process.exitCode = 1;
        process.exit(1);
    } else {
        process.exitCode = 0;
        process.exit(0);
    }
});
