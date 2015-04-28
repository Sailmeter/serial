var utils = require("./utils.js");
var fs = require("fs");
var ivector = require("./intersect");

var lat =  49.2635844;
var lon = -123.1821251;


while (1) {
  direction = utils.getRandomArbitrary(180, 200);
  speed = utils.getRandomArbitrary(9, 15);
  
  sentenance = "$IIMWV," + direction.toFixed(2) + ",R," + speed.toFixed(2) + ",K,A";
  var checksum = utils.computeChecksum(sentenance);
  console.log(sentenance + checksum + "\r");   

  direction = utils.getRandomArbitrary(220, 240);
  speed = utils.getRandomArbitrary(2, 5);

  sentenance = "$VWVHW," + direction.toFixed(2) + ",M," + (direction-20).toFixed(2) + ",T," + speed.toFixed(2) + "," + (speed*1.852).toFixed(2);
  var checksum = utils.computeChecksum(sentenance);
  console.log(sentenance + checksum + "\r");   

  var latlon = ivector.getLine({x: lat, y: lon}, direction, speed/60/3600);
  lat = latlon.x;
  lon = latlon.y;

  sentenance = "$GPGGA,002500.060," + lat + ",N," + lon + ",W,0,00,,0.0,M,0.0,M,,0000";
  var checksum = utils.computeChecksum(sentenance);
  console.log(sentenance + checksum + "\r");   

}
