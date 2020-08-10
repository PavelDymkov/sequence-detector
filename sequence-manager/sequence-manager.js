const EventEmitter = require("events");
const { createSequenceDetector, timeout } = require("../index");

class SequenceManager extends EventEmitter {
    constructor() {
        super();

        this._sequenceList = [];
    }

    add(name, sequence) {
        this._sequenceList.push({
            name,
            sequenceDetector: createSequenceDetector(sequence),
        });
    }

    push(value) {
        this._sequenceList.forEach(item => {
            if (item.sequenceDetector(value)) {
                this.emit(item.name);
            }
        });
    }
}

exports.SequenceManager = SequenceManager;
exports.timeout = timeout;
