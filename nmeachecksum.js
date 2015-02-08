var utils = require("./utils.js");
var byline = require("byline");
var fs = require("fs");

var stream = fs.createReadStream(process.argv[2]);
stream = byline.createStream(stream);

stream.on('end', function() {
  process.exit(0);
});

stream.on('data', function(line) {
  var sentenance = line.toString();
  var checksum = utils.computeChecksum(sentenance);
  console.log(sentenance + checksum + "\r");   
});
