var isArray = require("isarray");
var not = require("logical-not");

function createSequenceDetector(sequence) {
    sequence = preprocess(sequence);

    if (not(sequence)) {
        return function defaultSequenceDetector() {
            return false;
        };
    }

    var i = 0;
    var lastIndex = sequence.length - 1;
    var timestamp = null;

    return function sequenceDetector(value) {
        if (timestamp && Date.now() > timestamp) {
            i = 0;
            timestamp = null;

            return false;
        } else {
            timestamp = null;
        }

        if (sequence[i] === value) {
            if (i === lastIndex) {
                i = 0;

                return true;
            } else {
                i += 1;

                if (sequence[i] instanceof timeout) {
                    timestamp = Date.now() + sequence[i].ms;

                    i += 1;
                }
            }
        } else {
            i = 0;
        }

        return false;
    };
}

function preprocess(sequence) {
    if (not(isArray(sequence))) return null;

    var i;

    for (i = 0; i < sequence.length; i++) {
        if (sequence[i] instanceof timeout === false) {
            sequence = sequence.slice(i);

            break;
        }
    }

    i = sequence.length;

    while (--i > 0) {
        if (sequence[i] instanceof timeout == false) {
            sequence = sequence.slice(0, i + 1);

            break;
        }
    }

    return sequence.length > 0 ? sequence : null;
}

function timeout(ms) {
    if (this instanceof timeout === false) return new timeout(ms);

    this.ms = ms;
}

exports.createSequenceDetector = createSequenceDetector;
exports.timeout = timeout;
