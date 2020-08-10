function deferred(callback, ms = 0) {
    if (!ms) {
        return Promise.resolve().then(callback);
    } else {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(callback());
            }, ms);
        });
    }
}

class TestMessages {
    constructor() {
        this.messages = [];
    }

    push(message) {
        this.messages.push(message);
    }

    has(...messages) {
        const actual = [...this.messages];

        return messages.every(message => {
            const i = actual.indexOf(message);

            if (i === -1) return false;

            actual.splice(i, 1);

            return true;
        });
    }
}

exports.deferred = deferred;
exports.TestMessages = TestMessages;
