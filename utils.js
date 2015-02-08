var m_hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

exports.toHexString = function(v) {
    var lsn;
    var msn;

    msn = (v >> 4) & 0x0f;
    lsn = (v >> 0) & 0x0f;
    return m_hex[msn] + m_hex[lsn];
};

exports.verifyChecksum = function(sentence, checksum) {
    var q;
    var c1;
    var c2;
    var i;

    // skip the $
    i = 1;

    // init to first character
    c1 = sentence.charCodeAt(i);

    // process rest of characters, zero delimited
    for( i = 2; i < sentence.length; ++i) {
        c1 = c1 ^ sentence.charCodeAt(i);
    }

    // checksum is a 2 digit hex value
    c2 = parseInt(checksum, 16);

    // should be equal
    return ((c1 & 0xff) === c2);
};

// generate a checksum for  a sentence (no trailing *xx)
exports.computeChecksum = function(sentence) {
    var c1;
    var i;

    // skip the $
    i = 1;

    // init to first character    var count;

    c1 = sentence.charCodeAt(i);

    // process rest of characters, zero delimited
    for( i = 2; i < sentence.length; ++i) {
        c1 = c1 ^ sentence.charCodeAt(i);
    }

    return '*' + exports.toHexString(c1);
};

exports.getRandomArbitrary = function(min, max) {
    return Math.random() * (max - min) + min;
}
