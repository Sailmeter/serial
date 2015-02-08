var serialPort = require("serialport");
var lazy = require("lazy");
var byline = require('byline');
var fs  = require("fs");

var utils = require("./utils.js");

if (process.argv.length != 3) {
   console.log(process.argv[0] + " " + process.argv[1] + " <filename>");
   process.exit(1);
}

var filename = process.argv[2];

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyS0", {
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
    var stream = fs.createReadStream(filename);
    stream = byline.createStream(stream);
    stream.on('end', function() {
      serialPort.drain(cb);
    })
    stream.on('data', function(line) {
      stream.pause();
      serialPort.write(line.toString() + "\n", function(err, results) {
        console.log(line.toString());
        if (err) {
          console.log('failed to write: ' + err);
        }
        var timer = setInterval(function() {
          stream.resume();
        }, 1000);
      });
    });
}
