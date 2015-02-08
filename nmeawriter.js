var serialPort = require("serialport");
var LineByLineReader = require('line-by-line');
var fs  = require("fs");

var utils = require("./utils.js");

if (process.argv.length != 3) {
   console.log(process.argv[0] + " " + process.argv[1] + " <filename>");
   process.exit(1);
}

var filename = process.argv[2];

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB1", {
  baudrate: 4800,
  parser: serialPort.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]

serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    writeFileToPort(function() {
      serialPort.close(function() {
        process.exit(0);
      });
    });
  }
});

function writeFileToPort(cb) {
    var stream = new LineByLineReader(filename);
    stream.on('end', function() {
      serialPort.drain(cb);
    });
    stream.on('error', function(err) {
      console.log(err);
    });
    stream.on('line', function(line) {
      stream.pause();
      serialPort.write(line.toString() + "\n", function(err, results) {
        console.log(line.toString());
        if (err) {
          console.log('failed to write: ' + err);
        }
        serialPort.drain(function() {
          var timer = setTimeout(function() {
            stream.resume();
          }, 1000);
        });
      });
    });
}

