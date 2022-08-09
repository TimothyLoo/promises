/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

const Promise = require('bluebird');
const fs = require('fs');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // TODO
  var readFilesFunction = (file) => {
    return new Promise ((resolve, reject)=> {
      fs.readFile(file, 'utf8', (err, data)=>{
        if (err) {
          reject(err);
        } else {
          let lines = data.split('\n');
          resolve(lines[0]);
        }
      });
    });
  };

  let files = [];
  for (let i = 0; i < filePaths.length; i++) {
    files.push(readFilesFunction(filePaths[i]));
  }

  return Promise.all(files).then((firstLines)=>{
    let lines = firstLines.join('\n');
    return fs.writeFile(writePath, lines, (err, data)=>{
      if (err) {
        throw new Error ('this one error');
      } else {
        return data;
      }
    });
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};