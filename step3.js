const fs = require("fs");
const process = require("process");
const axios = require("axios");

/** handle output: write to file if "out" given, else print */

function handleOutput(text, out) {
  // if "--out" is given as an argument on the command line (--out is an optional argument to output to a file instead of printing to the console), write the text from 'text' file to 'out' file ; otherwise, print out the error.
  if (out) {
    fs.writeFile(out, text, "utf8", function (err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

/** read file 'path' and write the file contents 'data' to the 'out' file when handleOutput function is called ; otherwise, if there's an error, print it out */

function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

/** read page at URL and print it out. */
/** if axios request is successful, get the contents of the URL, use the resp.data as the first argument 'text' in handleOutput function with the optional 'out' as the second argument (as assigned below if given - equal to the 4th argument from the command line) This writes resp.data to the 'out' file. If axios request is unsuccessful, show the error and exit the function */

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let out;

// if 3rd argument on the command line is "--out", assign "out" to the 4th command line argument (i.e. 'new.text from command "node step3.js --out new.txt one.txt") and "path" to the 5th command line argument (i.e. one.txt from command "node step3.js --out new.txt one.txt"); otherwise if "--out" is not included as a command line argument, assign "path" to the 3rd command line argument (i.e. "one.txt" from command "node step3.js one.txt")
if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

// if "http" is included in what "path" is assigned to, execute webCat
if (path.slice(0, 4) === "http") {
  webCat(path, out);
} else {
  cat(path, out);
}
