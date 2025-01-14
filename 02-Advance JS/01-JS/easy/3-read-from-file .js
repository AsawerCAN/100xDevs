const fs = require("fs");

fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }
  console.log("File content", data);
});

let largeString = "A";
for (let i = 0; i < 20; i++) {
  largeString = largeString.repeat(2);
}
console.log("Large string generated.");

const reversedString = largeString.split("").reverse().join("");
console.log("String reversed. Length of string:", reversedString.length);
