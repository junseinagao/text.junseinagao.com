// @ts-check
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const { bundleMDX } = require("mdx-bundler");

const TARGET_DIR_PATH = "content";
const BUILD_DIR_NAME = "_markdowns";
const OUTPUT_DIR_PATH = "public/" + BUILD_DIR_NAME;
const TARGET_INDEX_FILE_NAME = "index.json";

main();

function main() {
  const watchFlag = process.argv.find((arg) => arg === "--watch");
  if (watchFlag) {
    watchMdFiles();
  } else {
    makeMdIndex();
  }
}

function watchMdFiles() {
  chokidar
    .watch(path.resolve(__dirname, TARGET_DIR_PATH))
    .on("all", (event, _path) => {
      console.log(
        `\x1b[33m[[make-md-index:event] ${event} in ${TARGET_DIR_PATH}\x1b[39m`
      );
      makeMdIndex();
    });
}

async function makeMdIndex() {
  const exists = fs.existsSync(path.resolve(__dirname, OUTPUT_DIR_PATH));
  if (!exists) fs.mkdirSync(path.resolve(__dirname, OUTPUT_DIR_PATH));
  const remarkMdxImages = await import(
    "./node_modules/remark-mdx-images/index.js"
  ).then((m) => m.default);

  const filePathes = fs
    .readdirSync(path.resolve(__dirname, TARGET_DIR_PATH))
    .filter(
      (filePath) => filePath.endsWith(".mdx") || filePath.endsWith(".md")
    );
  let results = [];
  filePathes.forEach((filePath) => {
    if (filePath.endsWith(TARGET_INDEX_FILE_NAME)) return;
    fs.readFile(
      path.resolve(__dirname, TARGET_DIR_PATH, filePath),
      { encoding: "utf8" },
      (err, data) => {
        if (err) throw err;
        bundleMDX({
          source: data,
          cwd: path.resolve(__dirname, TARGET_DIR_PATH),
          bundleDirectory: path.resolve(
            __dirname,
            OUTPUT_DIR_PATH,
            filePath.split(".")[0]
          ),
          bundlePath: path.join("/", BUILD_DIR_NAME, filePath.split(".")[0]),
          mdxOptions: (options) => {
            options.remarkPlugins = [
              ...(options.remarkPlugins ?? []),
              remarkMdxImages,
            ];

            return options;
          },
          esbuildOptions: (options) => {
            options.loader = {
              ...options.loader,
              ".png": "file",
              ".jpg": "dataurl",
              ".webp": "dataurl",
            };

            return options;
          },
        }).then(({ code, frontmatter }) => {
          const bundledPath = "__" + filePath.split(".")[0] + ".js";
          fs.writeFileSync(
            path.resolve(__dirname, OUTPUT_DIR_PATH, bundledPath),
            code
          );
          const result = {
            meta: frontmatter,
            // @ts-ignore
            slug: filePath.split(".")[0].replaceAll(/\s/g, "-"),
            // @ts-ignore
            url: "posts/" + filePath.split(".")[0].replaceAll(/\s/g, "-"),
            code: path
              .join(OUTPUT_DIR_PATH, bundledPath)
              .replace("public/", ""),
          };
          results.push(result);
          if (results.length === filePathes.length) {
            fs.writeFileSync(
              path.resolve(__dirname, OUTPUT_DIR_PATH, TARGET_INDEX_FILE_NAME),
              JSON.stringify(results, null, 2)
            );
            console.log(
              "\x1b[34m[make-md-index:info] index.json generated.\x1b[39m"
            );
          }
        });
      }
    );
  });
}
