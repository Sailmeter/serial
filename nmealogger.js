var serialPort = require("serialport");

var utils = require("./utils.js");

serialPort.list(function (err, ports) {
  if (err) {
    throw err;
  }
  ports.forEach(function(port) {
    console.warn("Port: " + port.comName);
    console.warn("Driver: " + port.pnpId);
    console.warn("Manufacturer: " + port.manufacturer);
    portLogger(port.comName);
  });
});

function portLogger(port) {

  var SerialPort = require("serialport").SerialPort
  var serialport = new SerialPort(port, {
    baudrate: 4800,
    parser: serialPort.parsers.readline("\n")
  }, false); // this is the openImmediately flag [default is true]

  serialport.open(function (error) {
    if ( error ) {
      console.log('failed to open: '+error);
    } else {
      var sentence = "";
      serialport.on('data', function(data) {
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
    }
  });

}
