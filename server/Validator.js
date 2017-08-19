var Generator = require('./Generator');

const banned = [];

class Validator {
    constructor(id) {
        this.id = id;
    }
    validate() {
        if(banned.indexOf(this.id) != -1) {
            return 'You are banned.';
        }
        return Generator.random(10);
    }
}

module.exports = Validator;