const fs = require("fs");
const path = "";

const fileCleaner = (path) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading File", err);
      return;
    }

    const cleanedData = data.replace(/\s+/g, " ").trim();

    fs.writeFile(path, cleanedData, (err) => {
      if (err) {
        console.log("Error writing", err);
        return;
      }
      console.log("File cleaned successfully");
    });
  });
};

fileCleaner(path);
