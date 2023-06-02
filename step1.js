const fs = require("fs");
const process = require("process");

/** read file at path and print it out. */

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}
// print out the third index of process.argv which is the first argument of readFile(prints out the contents of the file with the 'path' argument)
cat(process.argv[2]);
