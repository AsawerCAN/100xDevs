const { Command } = require("commander");
const fs = require("fs");
const program = new Command();

program
  .name("word-counter")
  .description("CLI to count words in a file")
  .version("1.0.0");

program
  .command("count_words")
  .description("Count words in a specified file")
  .argument("<filepath>", "path to the file")
  .action((filepath) => {
    try {
      const content = fs.readFileSync(filepath, "utf-8");
      const words = content
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      console.log(`You have ${words.length} words in this file`);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error("Error: File not found");
        process.exit(1);
      }
      console.error("Error reading file:", error.message);
      process.exit(1);
    }
  });

program.parse();
