/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = require('fs');
var request = require('needle');

var doStuff = require('./promiseConstructor.js');
var doStuff2 = require('./promisification.js');
var pluckFirstLineFromFileAsync = doStuff.pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = doStuff2.getGitHubProfileAsync;



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((userName)=>{
      return getGitHubProfileAsync(userName);
    })
    .then((userData)=>{
      return new Promise ((resolve, reject)=>{
        fs.writeFile(writeFilePath, JSON.stringify(userData), (err, data)=>{
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    });
  // return new Promise ((resolve, reject) =>{
  //   fs.readFile(readFilePath, 'utf8', (err, file)=>{
  //     if (err) {
  //       reject(err);
  //     } else {
  //       let lines = file.split('\n');
  //       resolve(lines[0]);
  //     }
  //   });
  // }).then((user) => {
  //   return new Promise ((resolve, reject) => {
  //     request.get('https://api.github.com/users/' + user, (err, response)=>{
  //       if (err) {
  //         reject(err);
  //       } else {
  //         let body = JSON.stringify(response.body);
  //         resolve(body);
  //       }
  //     });
  //   });
  // }).then((dataObj)=>{
  //   console.log(dataObj);
  //   return new Promise ((resolve, reject) => {
  //     fs.writeFile(writeFilePath, dataObj, (err, res)=>{
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(res);
  //       }
  //     });
  //   });
  // });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
