var serialPort = require("serialport");

var utils = require("./utils.js");

serialPort.list(function (err, ports) {
  if (err) {
    throw err;
  }
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 4800,
  parser: serialPort.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]

serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    //console.log('open');
    var sentence = "";
    serialPort.on('data', function(data) {
        checksum = data.split('*');
        if(checksum.length === 2) {
            // there is a checksum
            sentence = checksum[0];
            checksum = checksum[1];
        } else {
            checksum = null;
        }
        if (checksum && utils.verifyChecksum(sentence, checksum)) {
          console.log(data);
        }
    });
    //serialPort.write("ls\n", function(err, results) {
    //  if (err) {
    //    console.log('failed to write: ' + err);
    //  }
    //  console.log('results ' + results);
    //});
  }
});
