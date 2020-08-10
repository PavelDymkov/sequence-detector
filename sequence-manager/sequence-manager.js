const EventEmitter = require("eventemitter3");

const { createSequenceDetector, timeout } = require("../index");

function SequenceManager() {
    if (this instanceof SequenceManager === false) return null;

    EventEmitter.call(this);

    this._sequenceList = [];
}

function getPropertyDescriptor(method) {
    return {
        value: method,
        configurable: true,
        enumerable: false,
        writable: true,
    };
}

SequenceManager.prototype = Object.create(EventEmitter.prototype, {
    constructor: getPropertyDescriptor(SequenceManager),

    add: getPropertyDescriptor(function add(name, sequence) {
        this._sequenceList.push({
            name,
            sequenceDetector: createSequenceDetector(sequence),
        });
    }),
    push: getPropertyDescriptor(function push(value) {
        this._sequenceList.forEach(item => {
            if (item.sequenceDetector(value)) {
                this.emit(item.name);
            }
        });
    }),
});

exports.SequenceManager = SequenceManager;
exports.timeout = timeout;
