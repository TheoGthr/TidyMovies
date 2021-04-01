const { resolve } = require('path');
const { readdir } = require('fs').promises;
const fs = require('fs');

const wantedDir = process.argv[2];
// -s --series Series
// -m --movies Movies

let filesArray = [];

async function* getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);

    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      const file = res.split(wantedDir)[1];
      yield file;
    }
  }
};

async function populateArray() {
  for await (const f of getFiles(wantedDir)) {
    console.log(f);
    filesArray.push(f);
  }
}

function filesArrayToObj() {
  filesArray.forEach((path) => {
    const splittedPath = path.split('/');
    if (splittedPath.length === 2) {
      const title = splittedPath[0]
    } else {
      const title = splittedPath[0].split('(')[0];
    }
  });
}

async function main() {
  console.log(`Looking for files in: ${wantedDir}`);

  await populateArray(wantedDir);
  console.log(filesArray);

  // filesArrayToObj();
}

main();
