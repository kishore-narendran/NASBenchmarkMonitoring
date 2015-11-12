var fs = require('fs');
var path = require('path');
var outputPath = path.join(__dirname, 'Output-NAS-1234', 'output_4');

var getFiles = function(err, files) {
  for(var i = 0; i < files.length; i++) {
    var fileName = files[i];
    var newFileName = files[i].substring(0,2) + '_' + files[i].charAt(2).toUpperCase() + "_4.txt";
    fs.renameSync(path.join(outputPath, fileName), path.join(outputPath, newFileName));
  }
};
fs.readdir(outputPath, getFiles);
