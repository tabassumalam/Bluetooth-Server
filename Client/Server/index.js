
const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const morgan = require("morgan");

//initialize, and avoids non-null values for the weight
var currAngle = 0; 

/* SERIALPORT USAGE*/
const SerialPort = require('serialport'); //package needed to talk to serialport        
port = new SerialPort('COM4', { //goes to port COM4 (can change, depends on laptop)
    baudRate: 9600
},
// error checking
function(err) {
  if (err) {
    return console.log("Error: ", err.message); 
  }
});


// build mini web app
const app = express();
app.use(morgan("combined")); // Prints all devices that have requested data.
app.use(bodyParser.json()); // Allows getting req.body.{jsonparam} in POST
app.use(cors()); // Allows cross-domain requests (http://domain-a can talk to http://domain-b)


// Run Server at port 8088
app.listen(8088);
console.log("Server Running at http://localhost:8088/scale");


// Switches the port into "flowing mode" 
port.on("readable", function() {
  var data = port.read()
});
port.on("data", (data) => {
  currAngle = data.toString("ascii")
});

// Just send a message
app.get("/scale", function(req, res) {
  console.log("Hello World");

  // Return OK
  res.status(200).send({
    msg: currAngle
  });
});