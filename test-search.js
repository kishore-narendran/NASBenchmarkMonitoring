var mongoClient = require('mongodb').MongoClient;

var getTestResults = function(machineId, testType, classType, numberOfThreads) {

  var searchDocument = {};
  var dbConnection;

  if(machineId != null) {
    searchDocument['machine_id'] = machineId;
  }

  if(testType != null) {
    searchDocument['test_name'] = testType;
  }

  if(classType != null) {
    searchDocument['class'] = classType;
  }

  if(numberOfThreads != null) {
    searchDocument['total_threads'] = numberOfThreads;
  }

  console.log(searchDocument);
  var onFindDocuments = function(err, results) {
    if(err) {
      console.log('Document Retreival Error!');
      return null;
    }
    else {
      dbConnection.close();
      return results;
    }
  };

  var onConnect = function(err, db) {
    if(err) {
      console.log('MongoDB Connection Unsuccessful');
      return null;
    }
    else {
      dbConnection = db;
      db.collection('results').find(searchDocument).toArray(onFindDocuments);
    }
  }

  mongoClient.connect('mongodb://kishore:kishore@ds053774.mongolab.com:53774/uci-cs244-benchmarks', onConnect);
};
*/
