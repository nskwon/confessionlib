//importing modules
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
const path = require("path");
var ObjectID = mongodb.ObjectID;
const http = require('http');


var CONFESSIONS_COLLECTION = "confessions";

var db;

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//connect to mongodb
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://nskwon:5Z9WVaa5HhQbZEgM@cluster0-shard-00-00.mjvmq.mongodb.net:27017,cluster0-shard-00-01.mjvmq.mongodb.net:27017,cluster0-shard-00-02.mjvmq.mongodb.net:27017/confessionlist?ssl=true&replicaSet=atlas-i4nxo2-shard-0&authSource=admin&retryWrites=true&w=majority", { useUnifiedTopology: true }, function (err, client) {
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
  
  app.get("/api/confessions/:id", function(req, res) {
    db.collection(CONFESSIONS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get confession");
      } else {
        res.status(200).json(doc);
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

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'src/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })