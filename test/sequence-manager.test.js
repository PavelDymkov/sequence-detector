const assert = require("assert");

const { SequenceManager } = require("../sequence-manager");
const { TestMessages } = require("./tools");

describe("SequenceManager tests", () => {
    it("common SequenceManager test", () => {
        const sequenceManager = new SequenceManager();

        const event1 = "event1";
        const event2 = Symbol("event2");

        sequenceManager.add(event1, [1, 2]);
        sequenceManager.add(event2, [1, 2, 3]);

        const messages = new TestMessages();

        sequenceManager.on(event1, () => {
            messages.push("event1");
        });

        sequenceManager.on(event2, () => {
            messages.push("event2");
        });

        sequenceManager.push(0);
        sequenceManager.push(1);
        sequenceManager.push(2);
        sequenceManager.push(0);
        sequenceManager.push(1);
        sequenceManager.push(2);
        sequenceManager.push(3);
        sequenceManager.push(4);

        assert.equal(messages.has("event1", "event1", "event2"), true);
    });
});
