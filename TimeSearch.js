var moment = require('moment');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var config = {
	"databaseLocal": {
		"uri": "mongodb://localhost:27017/weatherTW",
		"collection": "weatherAll"
	}
}
var startTime = moment.utc('2017-01-26T02:00:00.000Z');
var stationId = "466940";

MongoClient.connect(config.databaseLocal.uri, function(connecterr, db) {
	if (connecterr) {
		throw connecterr;
	}
	console.log('Connected to the DB Server...');
	var weatherAll = db.collection(config.databaseLocal.collection);

	var obsString = {"obsTime": {"$gte":new Date(startTime.utc().format()), "$lt":new Date(startTime.add(30, 'minutes').utc().format())}, "stationId": stationId};
	console.log(obsString);
	weatherAll.find(obsString).toArray(function(err, docs) {
		if(docs.length > 0){
			console.log(docs[0]);
			db.close();
		}
		else{
			console.log("No match records.");
			db.close();
		}
	});
});
