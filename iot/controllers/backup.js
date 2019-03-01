sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/home');
var targz = require('targz');
const fs = require('fs');
const zlib = require('zlib');
const tar = require('tar');

var dateFormat = require('dateformat');

module.exports = function (req, res) {
  var now = new Date();
  var ti = dateFormat(now, "yymmdd");
  /
  var list = '[';
  const directoryFiles = fs.readdirSync('./config/backup/export/');
  Promise.all(directoryFiles.map(filename => {
    return new Promise((resolve, reject) => {
    const fileContents = fs.createReadStream(`./config/backup/export/${filename}`);
    const writeStream = fs.createWriteStream(`./config/backup/archive/${ti}_${filename}.gz`);
    const zip = zlib.createGzip();
    list=list+'\''+filename+'\',';
    fileContents.pipe(zip).pipe(writeStream).on('finish', (err) => {
      if (err) return reject(err);
      else resolve();
    })
  })
}))
.then(console.log('done'));

  list = list +'\'eof\']';
  console.log(list);
  var response={files: list};
//  console.log(response);
//  var obj=JSON.parse(response);
//  res.send(response);

 targz.compress({
    src: './config/backup/export/',
    dest: './config/backup/archive/?(ti)_backup.tgz'
}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Done!");
    }
}); 
  


res.redirect('/');

  }
