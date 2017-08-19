var crypto = require('crypto');

class Generator {
    static random(bytes) {
        return crypto.randomBytes(bytes).toString('hex');
    }
} 

module.exports = Generator;