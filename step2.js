const fs = require("fs");
const process = require("process");
const axios = require("axios");

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

/** read page at URL and print it out. */
async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

// Assign 'path' to the third index of process.argv (the command line args) i.e node step2.js one.txt or node step2.js http://google.com which will either be a file path (one.txt) or a url (http://google.com). Depending on the command-line args and if "http" is included in the 3rd index, either cat or webCat will be called.
let path = process.argv[2];

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
