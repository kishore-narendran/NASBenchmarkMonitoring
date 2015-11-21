var fs = require('fs');
var path = require('path');
var async = require('async');
var mongoClient = require('mongodb').MongoClient;
var outputDirectory = path.join(__dirname, 'Output-Kishorex64');
var MACHINE_ID = 2;
var singleThreadPerformance = {};
var dbConnection;


var onFinish = function(err, results) {
  if(err) {
    console.log('Error!');
  }
  else {
    console.log('Parsing JSON Files Complete!');
    dbConnection.collection('results1').insert(results, function(err, result) {
      if(err) {
        console.log('MongoDB Write Error!');
      }
      else {
        console.log('MongoDB Write Success!');
        process.exit();
      }
    });
  }
};

var getTestMetrics = function(data, callback) {
  data['speedup'] = singleThreadPerformance[data['test_name']][data['class']]/data['time'];
  data['efficiency'] = data['speedup']/data['total_threads'];
  data['machine_id'] = MACHINE_ID;
  callback(null, data);
};

var getJSONData = function(jsonFile) {
  var data = require(path.join(outputDirectory, jsonFile));
  data['test_name'] = jsonFile.split('_')[0];
  return data;
};

var getFiles = function(err, files) {
  var jsonFiles = [];
  for(var i = 0; i < files.length; i++) {
    if(files[i].split('.').pop() == 'json') {
      jsonFiles.push(files[i]);
    }
  }

  var resultData = jsonFiles.map(getJSONData);

  for(var i = 0; i < resultData.length; i++) {
    var data = resultData[i];
    if(data['total_threads'] == 1) {
      if(!(data['test_name'] in singleThreadPerformance)) {
        singleThreadPerformance[data['test_name']] = {};
        singleThreadPerformance[data['test_name']][data['class']] = {};
      }
      else {
        if(!(data['class'] in singleThreadPerformance[data['test_name']])) {
          singleThreadPerformance[data['test_name']][data['class']] = {};
        }
      }
      singleThreadPerformance[data['test_name']][data['class']] = data['time'];
    }
  }

  async.map(resultData, getTestMetrics, onFinish);
};


mongoClient.connect('mongodb://kishore:kishore@ds053774.mongolab.com:53774/uci-cs244-benchmarks', function(err, db) {
  if(err) {
    console.log('Database connection error!');
  }
  else {
    dbConnection = db;
    fs.readdir(outputDirectory, getFiles);
  }
});
