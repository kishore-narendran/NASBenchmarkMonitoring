var fs = require('fs');
var async = require('async');
var path = require('path');
var singleThreadPerformance = {};
var outputDirectory = path.join(__dirname, 'Output-Prashantx86');

var findSingleThreadPerformance = function(resultData) {
  for(var i = 0; i < resultData.length; i++) {
    var data = resultData[i];
    if(data['total_threads'] != 1 && data['available_threads'] != 1) {
      continue;
    }
    else {
      if(!(data['test_name'] in singleThreadPerformance)) {
        singleThreadPerformance[data['test_name']] = {};
      }
      singleThreadPerformance[data['test_name']][data['class']] = data['time'];
    }
  }

};
var getJSONData = function(file) {
  if(file.split('.').pop() != 'json') {
    return {};
  }
  else {
    var data = require(path.join(outputDirectory, file));
    data['test_name'] = file.split('_')[0];
    return data;
  }
};

var getJSONFiles = function(err, files) {
  if(err) {
    console.log('Error 1 - Unable to get output files!');
  }
  else {
    var resultData = files.map(getJSONData);
    findSingleThreadPerformance(resultData);
    console.log(singleThreadPerformance);
  }
};

fs.readdir(outputDirectory, getJSONFiles);
