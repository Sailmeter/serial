var utils = require("./utils.js");
var byline = require("byline");
var fs = require("fs");


while (1) {
  direction = utils.getRandomArbitrary(180, 200);
  speed = utils.getRandomArbitrary(9, 15);
  
  sentenance = "$IIMWV," + direction.toFixed(2) + ",R," + speed.toFixed(2) + ",K,A";
  var checksum = utils.computeChecksum(sentenance);

  console.log(sentenance + checksum + "\r");   
}
