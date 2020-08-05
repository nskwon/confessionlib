//importing modules
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
const path = require("path");
var ObjectID = mongodb.ObjectID;

var CONFESSIONS_COLLECTION = "confessions";

var db;

var app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('/client/dist/client'));
}

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, '/client/dist/client', 'index.html'));
});

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//connect to mongodb
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.get("/api/confessions", function(req, res) {
    db.collection(CONFESSIONS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get confessions.");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  
  app.post("/api/confessions", function(req, res) {
    var newConfession = req.body;
    newConfession.createDate = new Date();
  
    if (!req.body.submission) {
      handleError(res, "Invalid user input", "Must provide a submission.", 400);
    } else {
      db.collection(CONFESSIONS_COLLECTION).insertOne(newConfession, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new confession.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });

  app.get("/api/confessions/:id", function(req, res) {
    db.collection(CONFESSIONS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get confession");
      } else {
        res.status(200).json(doc);
      }
    });
  });

  app.put("/api/confessions/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;
  
    db.collection(CONFESSIONS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update confession");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    });
  });
  
  app.delete("/api/confessions/:id", function(req, res) {
    db.collection(CONFESSIONS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete confession");
      } else {
        res.status(200).json(req.params.id);
      }
    });
  });