//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
require('dotenv').config()

var app = express();

const route =  require('./routes/route');

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/confessionlist');

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error in Database connection: ' + err);
    }

});

//port no
const port = process.env.PORT || 8080;

//adding middleware - cors
app.use(cors());

//body - parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//testing
app.get('/',(req, res)=>{
    res.send('foobar');
});

app.listen(port)