const EventEmitter = require("eventemitter3");

const { createSequenceDetector, timeout } = require("../index");

function SequenceManager() {
    if (this instanceof SequenceManager === false) return null;

    EventEmitter.call(this);

    this._sequenceList = [];
}

SequenceManager.prototype = Object.create(EventEmitter.prototype, {
    constructor: {
        value: SequenceManager,
    },

    add: {
        value: function add(name, sequence) {
            this._sequenceList.push({
                name,
                sequenceDetector: createSequenceDetector(sequence),
            });
        },
    },
    push: {
        value: function push(value) {
            this._sequenceList.forEach(item => {
                if (item.sequenceDetector(value)) {
                    this.emit(item.name);
                }
            });
        },
    },
});

exports.SequenceManager = SequenceManager;
exports.timeout = timeout;
