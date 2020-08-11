const assert = require("assert");

const { deferred } = require("./tools");
const { createSequenceDetector, timeout } = require("../index");

describe("createSequenceDetector tests", () => {
    it("normal deferred calling", async () => {
        const sequenceDetector = createSequenceDetector([1, 2, 3]);

        for (let i = 0, lim = 5; i < lim; i++) {
            const value = await deferred(() => sequenceDetector(i));

            assert.equal(value, i === 3);
        }
    });

    it("calling with non-sequence value", () => {
        const sequenceDetector = createSequenceDetector([1, 2, 3]);

        assert.equal(sequenceDetector(0), false);
        assert.equal(sequenceDetector(1), false);
        assert.equal(sequenceDetector(2), false);
        assert.equal(sequenceDetector(0), false);
        assert.equal(sequenceDetector(3), false);
        assert.equal(sequenceDetector(1), false);
        assert.equal(sequenceDetector(2), false);
        assert.equal(sequenceDetector(3), true);
        assert.equal(sequenceDetector(1), false);
    });

    it("several callings", () => {
        const sequenceDetector = createSequenceDetector([1, 2, 3]);

        assert.equal(sequenceDetector(1), false);
        assert.equal(sequenceDetector(2), false);
        assert.equal(sequenceDetector(3), true);
        assert.equal(sequenceDetector(1), false);
        assert.equal(sequenceDetector(2), false);
        assert.equal(sequenceDetector(3), true);
        assert.equal(sequenceDetector(1), false);
    });

    it("deferred calling with timeout", async () => {
        const sequenceDetector = createSequenceDetector([1, timeout(50), 2]);

        let value;

        value = await deferred(() => sequenceDetector(1));
        assert.equal(value, false);
        value = await deferred(() => sequenceDetector(2), 100);
        assert.equal(value, false);

        value = await deferred(() => sequenceDetector(1));
        assert.equal(value, false);
        value = await deferred(() => sequenceDetector(2));
        assert.equal(value, true);
    });

    it("calling with timeout and non-sequence value", async () => {
        const sequenceDetector = createSequenceDetector([1, timeout(50), 2]);

        let value;

        value = await deferred(() => sequenceDetector(1));
        assert.equal(value, false);
        value = await deferred(() => sequenceDetector(0));
        assert.equal(value, false);
        value = await deferred(() => sequenceDetector(2));
        assert.equal(value, false);
    });

    it("function in sequence", () => {
        const sequenceDetector = createSequenceDetector([
            item => item.x === "x1" && item.y === "y2",
        ]);

        assert.equal(sequenceDetector({ x: "x1", y: "y1" }), false);
        assert.equal(sequenceDetector({ x: "x1", y: "y2" }), true);
        assert.equal(sequenceDetector({ x: "x2", y: "y1" }), false);
        assert.equal(sequenceDetector({ x: "x2", y: "y1" }), false);
    });
});
