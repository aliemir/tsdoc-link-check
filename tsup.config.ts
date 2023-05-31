import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts", "src/cli.ts"],
    sourcemap: true,
    dts: false,
    clean: true,
    platform: "node",
    onSuccess: "tsc --project tsconfig.declarations.json",
});
