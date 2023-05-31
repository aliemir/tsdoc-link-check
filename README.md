# tsdoc-link-check

A simple tool to check the broken links in your TSDoc comments

## Usage

You can use this tool as a CLI or as a library.

## Options

| Option                | Description                                | Default                                                                                   |
| --------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `--patterns` `-p`     | Glob patterns to search for TSDoc comments | `["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]`                                          |
| `--ignored` `-i`      | Glob patterns to ignore                    | `["**/node_modules/**/*", "**/dist/**/*", "**/build/**/*", "**/*.test.*", "**/*.spec.*"]` |
| `--ignore-links` `-l` | Links to ignore                            | `[]`                                                                                      |
| `--git-ignore`, `-g`  | Use .gitignore to ignore files             | `true`                                                                                    |
| `--no-log`, `-o`      | Disable logging                            | `false`                                                                                   |

## Tips

It will parse every `@link` in the comments and check if the link is working or not by sending a `HEAD` request. Requests has a default retry count of 3.

CLI will exit with code `1` if there is any broken link. If you don't set `--no-log` option, it will print the broken links to the console.