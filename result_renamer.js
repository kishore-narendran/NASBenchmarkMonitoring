var fs = require('fs');
var path = require('path');
var x  = "8";
var outputPath = path.join(__dirname, 'Outputx64', 'output_' + x);


var getFiles = function(err, files) {
  for(var i = 0; i < files.length; i++) {
    var fileName = files[i];
    var newFileName = files[i].substring(0,2) + '_' + files[i].charAt(2).toUpperCase() + "_" + x + ".json";
    fs.renameSync(path.join(outputPath, fileName), path.join(outputPath, newFileName));
  }
};

fs.readdir(outputPath, getFiles);
