import chalk from "chalk";
import { AllCheckResults } from "..";

export const successfullLink = (link: string, file: string) => {
    console.log(`${chalk.bgGreenBright.white.bold(" OK ")} ${chalk.green(link)} (${chalk.blue(file)})`);
};

export const failedLink = (link: string, file: string, location?: string) => {
    console.log(
        `${chalk.bgRedBright.white.bold(" FAIL ")} ${chalk.red(link)} (${chalk.blue(file)}${
            location ? chalk.blue` at L${location}` : ""
        })`,
    );
};

export const ignoredLink = (link: string, file: string) => {
    console.log(`${chalk.bgYellow.white.bold(" IGNORED ")} ${chalk.yellow(link)} (${chalk.yellow(file)})`);
};

export const retryLink = (link: string, file: string, count: number) => {
    console.log(`${chalk.bgGray.white.bold`RETRY ${count}`} ${chalk.yellow(link)} (${chalk.gray(file)})`);
};

export const logResults = (results: AllCheckResults) => {
    console.log(
        `
${chalk.bold.bgGreen.white("Successful:")} ${chalk.bold(results.valid.length)}
${chalk.bold.bgRed.white("Failed:")}: ${chalk.bold(results.invalid.length)}
${chalk.bold.bgGray.white("Ignored:")}: ${chalk.bold(results.ignored.length)}
`,
    );

    results.invalid.forEach((link) => {
        failedLink(link.link.urlDestination ?? "", link.file, link.location?.start.line.toString());
    });
};
