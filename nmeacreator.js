var utils = require("./utils.js");
var fs = require("fs");


while (1) {
  direction = utils.getRandomArbitrary(180, 200);
  speed = utils.getRandomArbitrary(9, 15);
  
  sentenance = "$IIMWV," + direction.toFixed(2) + ",R," + speed.toFixed(2) + ",K,A";
  var checksum = utils.computeChecksum(sentenance);
  console.log(sentenance + checksum + "\r");   

  direction = utils.getRandomArbitrary(220, 240);
  speed = utils.getRandomArbitrary(2, 5);

  sentenance = "$IIVHW," + direction.toFixed(2) + ",M," + (direction-20).toFixed(2) + ",T," + speed.toFixed(2) + "," + (speed*1.852).toFixed(2);
  var checksum = utils.computeChecksum(sentenance);
  console.log(sentenance + checksum + "\r");   
}
