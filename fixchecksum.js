var LineByLineReader = require('line-by-line');
var fs  = require("fs");

var utils = require("./utils.js");

if (process.argv.length != 3) {
   console.log(process.argv[0] + " " + process.argv[1] + " <filename>");
   process.exit(1);
}

var filename = process.argv[2];

    var stream = new LineByLineReader(filename);
    stream.on('end', function() {
      process.exit(0);
    });
    stream.on('error', function(err) {
      console.log(err);
    });
    stream.on('line', function(line) {
      stream.pause();
      console.log(line.toString() + utils.computeChecksum(line));
      stream.resume();
    });

